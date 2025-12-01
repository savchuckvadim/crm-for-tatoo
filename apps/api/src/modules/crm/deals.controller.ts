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
import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './dto/deals.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('CRM - Deals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deal' })
  async create(
    @Param('portalId') portalId: string,
    @Req() req,
    @Body() dto: CreateDealDto,
  ) {
    return this.dealsService.create(portalId, req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deals for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('stage') stage?: string,
  ) {
    return this.dealsService.findAll(portalId, stage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deal by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.dealsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update deal' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateDealDto,
  ) {
    return this.dealsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete deal' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.dealsService.remove(id, portalId);
    return { message: 'Deal deleted successfully' };
  }
}

