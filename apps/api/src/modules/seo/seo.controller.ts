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
import { SeoService } from './seo.service';
import {
  CreateSeoKeywordDto,
  CreateSeoArticleDto,
  UpdateSeoArticleDto,
} from './dto/seo.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('SEO')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Post('keywords')
  @ApiOperation({ summary: 'Create a new SEO keyword' })
  async createKeyword(
    @Param('portalId') portalId: string,
    @Body() dto: CreateSeoKeywordDto,
  ) {
    return this.seoService.createKeyword(portalId, dto);
  }

  @Get('keywords')
  @ApiOperation({ summary: 'Get all SEO keywords for portal' })
  async findAllKeywords(
    @Param('portalId') portalId: string,
    @Query('language') language?: string,
  ) {
    return this.seoService.findAllKeywords(portalId, language);
  }

  @Post('articles')
  @ApiOperation({ summary: 'Create a new SEO article' })
  async createArticle(
    @Param('portalId') portalId: string,
    @Body() dto: CreateSeoArticleDto,
  ) {
    return this.seoService.createArticle(portalId, dto);
  }

  @Get('articles')
  @ApiOperation({ summary: 'Get all SEO articles for portal' })
  async findAllArticles(
    @Param('portalId') portalId: string,
    @Query('language') language?: string,
    @Query('isPublished') isPublished?: boolean,
  ) {
    return this.seoService.findAllArticles(
      portalId,
      language,
      isPublished !== undefined ? isPublished === true : undefined,
    );
  }

  @Get('articles/:id')
  @ApiOperation({ summary: 'Get SEO article by ID' })
  async findArticle(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.seoService.findArticle(id, portalId);
  }

  @Patch('articles/:id')
  @ApiOperation({ summary: 'Update SEO article' })
  async updateArticle(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateSeoArticleDto,
  ) {
    return this.seoService.updateArticle(id, portalId, dto);
  }

  @Delete('articles/:id')
  @ApiOperation({ summary: 'Delete SEO article' })
  async removeArticle(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.seoService.removeArticle(id, portalId);
    return { message: 'Article deleted successfully' };
  }
}

