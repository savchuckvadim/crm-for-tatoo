import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Integration, IntegrationType } from '@crm/prisma/generated/prisma';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dto/integrations.dto';

@Injectable()
export class IntegrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, dto: CreateIntegrationDto): Promise<Integration> {
    // Check if integration of this type already exists
    const existing = await this.prisma.integration.findFirst({
      where: {
        portalId,
        type: dto.type,
      },
    });

    if (existing) {
      throw new BadRequestException(`Integration of type ${dto.type} already exists`);
    }

    return this.prisma.integration.create({
      data: {
        portalId,
        type: dto.type,
        config: dto.config,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });
  }

  async findAll(portalId: string, type?: IntegrationType): Promise<Integration[]> {
    return this.prisma.integration.findMany({
      where: {
        portalId,
        ...(type && { type }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Integration> {
    const integration = await this.prisma.integration.findFirst({
      where: {
        id,
        portalId,
      },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    return integration;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateIntegrationDto,
  ): Promise<Integration> {
    const integration = await this.prisma.integration.findFirst({
      where: { id, portalId },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    return this.prisma.integration.update({
      where: { id },
      data: {
        config: dto.config,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const integration = await this.prisma.integration.findFirst({
      where: { id, portalId },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    await this.prisma.integration.delete({
      where: { id },
    });
  }

  async handleWebhook(
    portalId: string,
    type: IntegrationType,
    payload: any,
  ): Promise<any> {
    const integration = await this.prisma.integration.findFirst({
      where: {
        portalId,
        type,
        isActive: true,
      },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found or inactive');
    }

    // Handle different webhook types
    switch (type) {
      case IntegrationType.INSTAGRAM:
        return this.handleInstagramWebhook(portalId, payload);
      default:
        throw new BadRequestException(`Webhook handler for ${type} not implemented`);
    }
  }

  private async handleInstagramWebhook(portalId: string, payload: any): Promise<any> {
    // Create lead from Instagram webhook
    // This is a placeholder - implement actual Instagram webhook handling
    return {
      message: 'Instagram webhook processed',
      portalId,
    };
  }
}

