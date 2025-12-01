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
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto, UpdateCustomFieldDto } from './dto/custom-fields.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EntityType } from '@crm/prisma/generated/prisma';

@ApiTags('Custom Fields')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/custom-fields')
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new custom field' })
  async create(
    @Param('portalId') portalId: string,
    @Body() dto: CreateCustomFieldDto,
  ) {
    return this.customFieldsService.create(portalId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all custom fields for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('entityType') entityType?: EntityType,
  ) {
    return this.customFieldsService.findAll(portalId, entityType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get custom field by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.customFieldsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update custom field' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateCustomFieldDto,
  ) {
    return this.customFieldsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete custom field' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.customFieldsService.remove(id, portalId);
    return { message: 'Custom field deleted successfully' };
  }

  @Post(':id/values')
  @ApiOperation({ summary: 'Set value for custom field' })
  async setValue(
    @Param('id') fieldId: string,
    @Body('entityType') entityType: EntityType,
    @Body('entityId') entityId: string,
    @Body('value') value: any,
  ) {
    await this.customFieldsService.setValue(fieldId, entityType, entityId, value);
    return { message: 'Value set successfully' };
  }

  @Get('values/:entityType/:entityId')
  @ApiOperation({ summary: 'Get all values for entity' })
  async getValues(
    @Param('entityType') entityType: EntityType,
    @Param('entityId') entityId: string,
  ) {
    return this.customFieldsService.getValues(entityType, entityId);
  }
}

