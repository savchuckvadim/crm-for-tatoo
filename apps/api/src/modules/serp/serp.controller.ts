import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { SerpService } from './serp.service';
import { CreateSerpPositionDto } from './dto/serp.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('SERP Monitoring')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/serp')
export class SerpController {
  constructor(private readonly serpService: SerpService) {}

  @Post('positions')
  @ApiOperation({ summary: 'Create a new SERP position record' })
  async createPosition(
    @Param('portalId') portalId: string,
    @Body() dto: CreateSerpPositionDto,
  ) {
    return this.serpService.createPosition(portalId, dto);
  }

  @Get('positions')
  @ApiOperation({ summary: 'Get all SERP positions for portal' })
  async findAllPositions(
    @Param('portalId') portalId: string,
    @Query('keywordId') keywordId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.serpService.findAllPositions(
      portalId,
      keywordId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('keywords/:keywordId/history')
  @ApiOperation({ summary: 'Get position history for keyword' })
  async getPositionHistory(
    @Param('portalId') portalId: string,
    @Param('keywordId') keywordId: string,
    @Query('days') days?: number,
  ) {
    return this.serpService.getPositionHistory(portalId, keywordId, days);
  }

  @Get('keywords/:keywordId/latest')
  @ApiOperation({ summary: 'Get latest position for keyword' })
  async getLatestPosition(
    @Param('portalId') portalId: string,
    @Param('keywordId') keywordId: string,
  ) {
    return this.serpService.getLatestPosition(portalId, keywordId);
  }
}

