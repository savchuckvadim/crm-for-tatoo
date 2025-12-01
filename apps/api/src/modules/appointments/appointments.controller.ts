import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointments.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  async create(
    @Param('portalId') portalId: string,
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.appointmentsService.create(portalId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('assignedToId') assignedToId?: string,
  ) {
    return this.appointmentsService.findAll(portalId, startDate, endDate, assignedToId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.appointmentsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update appointment' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.appointmentsService.remove(id, portalId);
    return { message: 'Appointment deleted successfully' };
  }
}

