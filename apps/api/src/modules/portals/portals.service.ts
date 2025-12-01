import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Portal, SubscriptionStatus } from '@crm/prisma/generated/prisma';
import { CreatePortalDto, UpdatePortalDto } from './dto/portals.dto';

@Injectable()
export class PortalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePortalDto): Promise<Portal> {
    // Check if subdomain is unique
    if (dto.subdomain) {
      const existing = await this.prisma.portal.findUnique({
        where: { subdomain: dto.subdomain },
      });
      if (existing) {
        throw new BadRequestException('Subdomain already taken');
      }
    }

    const portal = await this.prisma.portal.create({
      data: {
        name: dto.name,
        subdomain: dto.subdomain,
        customDomain: dto.customDomain,
        logo: dto.logo,
        primaryColor: dto.primaryColor,
        secondaryColor: dto.secondaryColor,
        settings: dto.settings || {},
        subscriptionStatus: SubscriptionStatus.TRIAL,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      },
    });

    // Create owner role for the creator
    await this.prisma.userPortalRole.create({
      data: {
        userId,
        portalId: portal.id,
        role: 'OWNER',
      },
    });

    return portal;
  }

  async findAll(userId: string): Promise<Portal[]> {
    const userRoles = await this.prisma.userPortalRole.findMany({
      where: { userId },
      include: { portal: true },
    });

    return userRoles.map((ur) => ur.portal);
  }

  async findOne(id: string, userId: string): Promise<Portal> {
    // Check if user has access to this portal
    const userRole = await this.prisma.userPortalRole.findUnique({
      where: {
        userId_portalId: {
          userId,
          portalId: id,
        },
      },
    });

    if (!userRole) {
      throw new NotFoundException('Portal not found or access denied');
    }

    const portal = await this.prisma.portal.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                surname: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!portal) {
      throw new NotFoundException('Portal not found');
    }

    return portal;
  }

  async update(id: string, userId: string, dto: UpdatePortalDto): Promise<Portal> {
    // Check if user has admin/owner access
    const userRole = await this.prisma.userPortalRole.findUnique({
      where: {
        userId_portalId: {
          userId,
          portalId: id,
        },
      },
    });

    if (!userRole || !['OWNER', 'ADMIN'].includes(userRole.role)) {
      throw new NotFoundException('Portal not found or insufficient permissions');
    }

    // Check subdomain uniqueness if changing
    if (dto.subdomain) {
      const existing = await this.prisma.portal.findFirst({
        where: {
          subdomain: dto.subdomain,
          NOT: { id },
        },
      });
      if (existing) {
        throw new BadRequestException('Subdomain already taken');
      }
    }

    return this.prisma.portal.update({
      where: { id },
      data: {
        name: dto.name,
        subdomain: dto.subdomain,
        customDomain: dto.customDomain,
        logo: dto.logo,
        primaryColor: dto.primaryColor,
        secondaryColor: dto.secondaryColor,
        settings: dto.settings,
      },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    // Only owner can delete portal
    const userRole = await this.prisma.userPortalRole.findUnique({
      where: {
        userId_portalId: {
          userId,
          portalId: id,
        },
      },
    });

    if (!userRole || userRole.role !== 'OWNER') {
      throw new NotFoundException('Portal not found or insufficient permissions');
    }

    await this.prisma.portal.delete({
      where: { id },
    });
  }

  async addUserToPortal(
    portalId: string,
    userId: string,
    targetUserId: string,
    role: string,
  ): Promise<void> {
    // Check if requester has admin/owner access
    const requesterRole = await this.prisma.userPortalRole.findUnique({
      where: {
        userId_portalId: {
          userId,
          portalId,
        },
      },
    });

    if (!requesterRole || !['OWNER', 'ADMIN'].includes(requesterRole.role)) {
      throw new NotFoundException('Insufficient permissions');
    }

    await this.prisma.userPortalRole.upsert({
      where: {
        userId_portalId: {
          userId: targetUserId,
          portalId,
        },
      },
      create: {
        userId: targetUserId,
        portalId,
        role: role as any,
      },
      update: {
        role: role as any,
      },
    });
  }
}

