import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Deal } from '@crm/prisma/generated/prisma';
import { CreateDealDto, UpdateDealDto } from './dto/deals.dto';

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, userId: string, dto: CreateDealDto): Promise<Deal> {
    return this.prisma.deal.create({
      data: {
        portalId,
        title: dto.title,
        stage: dto.stage || 'New',
        value: dto.value,
        currency: dto.currency || 'EUR',
        probability: dto.probability || 0,
        expectedCloseDate: dto.expectedCloseDate,
        notes: dto.notes,
        metadata: dto.metadata || {},
        clientId: dto.clientId,
        leadId: dto.leadId,
        assignedToId: dto.assignedToId,
        createdById: userId,
      },
    });
  }

  async findAll(portalId: string, stage?: string): Promise<Deal[]> {
    return this.prisma.deal.findMany({
      where: {
        portalId,
        ...(stage && { stage }),
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        appointments: {
          orderBy: { startTime: 'desc' },
          take: 3,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Deal> {
    const deal = await this.prisma.deal.findFirst({
      where: {
        id,
        portalId,
      },
      include: {
        client: true,
        lead: true,
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        appointments: {
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return deal;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateDealDto,
  ): Promise<Deal> {
    const deal = await this.prisma.deal.findFirst({
      where: { id, portalId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return this.prisma.deal.update({
      where: { id },
      data: {
        title: dto.title,
        stage: dto.stage,
        value: dto.value,
        currency: dto.currency,
        probability: dto.probability,
        expectedCloseDate: dto.expectedCloseDate,
        notes: dto.notes,
        metadata: dto.metadata,
        clientId: dto.clientId,
        leadId: dto.leadId,
        assignedToId: dto.assignedToId,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const deal = await this.prisma.deal.findFirst({
      where: { id, portalId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    await this.prisma.deal.delete({
      where: { id },
    });
  }
}

