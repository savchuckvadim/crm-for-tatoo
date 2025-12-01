import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Appointment, AppointmentStatus } from '@crm/prisma/generated/prisma';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, dto: CreateAppointmentDto): Promise<Appointment> {
    // Validate time range
    if (new Date(dto.endTime) <= new Date(dto.startTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    // Check for conflicts
    const conflicts = await this.prisma.appointment.findMany({
      where: {
        portalId,
        assignedToId: dto.assignedToId,
        status: {
          not: AppointmentStatus.CANCELLED,
        },
        OR: [
          {
            startTime: {
              lte: new Date(dto.endTime),
            },
            endTime: {
              gte: new Date(dto.startTime),
            },
          },
        ],
      },
    });

    if (conflicts.length > 0) {
      throw new BadRequestException('Time slot is already booked');
    }

    return this.prisma.appointment.create({
      data: {
        portalId,
        title: dto.title,
        description: dto.description,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        status: dto.status || AppointmentStatus.SCHEDULED,
        location: dto.location,
        clientId: dto.clientId,
        dealId: dto.dealId,
        productId: dto.productId,
        assignedToId: dto.assignedToId,
        metadata: dto.metadata || {},
      },
    });
  }

  async findAll(
    portalId: string,
    startDate?: string,
    endDate?: string,
    assignedToId?: string,
  ): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      where: {
        portalId,
        ...(startDate && {
          startTime: {
            gte: new Date(startDate),
          },
        }),
        ...(endDate && {
          endTime: {
            lte: new Date(endDate),
          },
        }),
        ...(assignedToId && { assignedToId }),
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        deal: {
          select: {
            id: true,
            title: true,
            value: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
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
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        id,
        portalId,
      },
      include: {
        client: true,
        deal: true,
        product: true,
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            surname: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, portalId },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Validate time range if updating times
    if (dto.startTime && dto.endTime) {
      if (new Date(dto.endTime) <= new Date(dto.startTime)) {
        throw new BadRequestException('End time must be after start time');
      }
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        status: dto.status,
        location: dto.location,
        clientId: dto.clientId,
        dealId: dto.dealId,
        productId: dto.productId,
        assignedToId: dto.assignedToId,
        metadata: dto.metadata,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, portalId },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    await this.prisma.appointment.delete({
      where: { id },
    });
  }
}

