import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/leads.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { LeadStatus } from '@crm/prisma/generated/prisma';

@ApiTags('CRM - Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  async create(
    @Param('portalId') portalId: string,
    @Req() req,
    @Body() dto: CreateLeadDto,
  ) {
    return this.leadsService.create(portalId, req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('status') status?: LeadStatus,
  ) {
    return this.leadsService.findAll(portalId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.leadsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lead' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.leadsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lead' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.leadsService.remove(id, portalId);
    return { message: 'Lead deleted successfully' };
  }

  @Post(':id/convert')
  @ApiOperation({ summary: 'Convert lead to client' })
  async convertToClient(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.leadsService.convertToClient(id, portalId);
  }
}

