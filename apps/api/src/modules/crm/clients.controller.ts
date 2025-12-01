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
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('CRM - Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  async create(
    @Param('portalId') portalId: string,
    @Req() req,
    @Body() dto: CreateClientDto,
  ) {
    return this.clientsService.create(portalId, req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients for portal' })
  async findAll(@Param('portalId') portalId: string) {
    return this.clientsService.findAll(portalId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.clientsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update client' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.clientsService.remove(id, portalId);
    return { message: 'Client deleted successfully' };
  }
}

