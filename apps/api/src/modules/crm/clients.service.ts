import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Client } from '@crm/prisma/generated/prisma';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, userId: string, dto: CreateClientDto): Promise<Client> {
    return this.prisma.client.create({
      data: {
        portalId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        avatar: dto.avatar,
        notes: dto.notes,
        metadata: dto.metadata || {},
        createdById: userId,
      },
    });
  }

  async findAll(portalId: string): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: { portalId },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
          },
        },
        deals: true,
        appointments: {
          orderBy: { startTime: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        portalId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
          },
        },
        deals: {
          include: {
            assignedTo: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        appointments: {
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id, portalId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.client.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        avatar: dto.avatar,
        notes: dto.notes,
        metadata: dto.metadata,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const client = await this.prisma.client.findFirst({
      where: { id, portalId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.client.delete({
      where: { id },
    });
  }
}

