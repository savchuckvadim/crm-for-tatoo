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
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dto/integrations.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { IntegrationType } from '@crm/prisma/generated/prisma';

@ApiTags('Integrations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new integration' })
  async create(
    @Param('portalId') portalId: string,
    @Body() dto: CreateIntegrationDto,
  ) {
    return this.integrationsService.create(portalId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all integrations for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('type') type?: IntegrationType,
  ) {
    return this.integrationsService.findAll(portalId, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get integration by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.integrationsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update integration' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateIntegrationDto,
  ) {
    return this.integrationsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete integration' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.integrationsService.remove(id, portalId);
    return { message: 'Integration deleted successfully' };
  }

  @Post('webhooks/:type')
  @ApiOperation({ summary: 'Handle webhook for integration' })
  async handleWebhook(
    @Param('portalId') portalId: string,
    @Param('type') type: IntegrationType,
    @Body() payload: any,
  ) {
    return this.integrationsService.handleWebhook(portalId, type, payload);
  }
}

