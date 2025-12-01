import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Lead, LeadStatus, LeadSource } from '@crm/prisma/generated/prisma';
import { CreateLeadDto, UpdateLeadDto } from './dto/leads.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(portalId: string, userId: string, dto: CreateLeadDto): Promise<Lead> {
    return this.prisma.lead.create({
      data: {
        portalId,
        source: dto.source || LeadSource.WEBSITE,
        status: dto.status || LeadStatus.NEW,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        notes: dto.notes,
        metadata: dto.metadata || {},
        createdById: userId,
        assignedToId: dto.assignedToId,
      },
    });
  }

  async findAll(portalId: string, status?: LeadStatus): Promise<Lead[]> {
    return this.prisma.lead.findMany({
      where: {
        portalId,
        ...(status && { status }),
      },
      include: {
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
        deals: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Lead> {
    const lead = await this.prisma.lead.findFirst({
      where: {
        id,
        portalId,
      },
      include: {
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
        deals: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateLeadDto,
  ): Promise<Lead> {
    const lead = await this.prisma.lead.findFirst({
      where: { id, portalId },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return this.prisma.lead.update({
      where: { id },
      data: {
        status: dto.status,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        notes: dto.notes,
        metadata: dto.metadata,
        assignedToId: dto.assignedToId,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const lead = await this.prisma.lead.findFirst({
      where: { id, portalId },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    await this.prisma.lead.delete({
      where: { id },
    });
  }

  async convertToClient(leadId: string, portalId: string): Promise<any> {
    const lead = await this.findOne(leadId, portalId);

    // Create client from lead
    const client = await this.prisma.client.create({
      data: {
        portalId,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        notes: lead.notes,
        metadata: {
          ...(lead.metadata as Record<string, any> || {}),
          convertedFromLead: leadId,
          convertedAt: new Date().toISOString(),
        },
      },
    });

    // Update lead status
    await this.prisma.lead.update({
      where: { id: leadId },
      data: {
        status: LeadStatus.CONVERTED,
        metadata: {
          ...(lead.metadata as Record<string, any> || {}),
          convertedToClient: client.id,
        },
      },
    });

    return client;
  }
}

