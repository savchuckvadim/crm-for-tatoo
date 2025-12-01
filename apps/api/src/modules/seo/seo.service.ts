import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SeoKeyword, SeoArticle } from '@crm/prisma/generated/prisma';
import { CreateSeoKeywordDto, CreateSeoArticleDto, UpdateSeoArticleDto } from './dto/seo.dto';

@Injectable()
export class SeoService {
  constructor(private readonly prisma: PrismaService) {}

  // Keywords
  async createKeyword(portalId: string, dto: CreateSeoKeywordDto): Promise<SeoKeyword> {
    return this.prisma.seoKeyword.create({
      data: {
        portalId,
        keyword: dto.keyword,
        language: dto.language || 'en',
        volume: dto.volume,
        difficulty: dto.difficulty,
      },
    });
  }

  async findAllKeywords(portalId: string, language?: string): Promise<SeoKeyword[]> {
    return this.prisma.seoKeyword.findMany({
      where: {
        portalId,
        ...(language && { language }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Articles
  async createArticle(portalId: string, dto: CreateSeoArticleDto): Promise<SeoArticle> {
    return this.prisma.seoArticle.create({
      data: {
        portalId,
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        excerpt: dto.excerpt,
        language: dto.language || 'en',
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        keywords: dto.keywords || [],
        faqSchema: dto.faqSchema,
        ogImage: dto.ogImage,
        isPublished: dto.isPublished || false,
        aiGenerated: dto.aiGenerated || false,
      },
    });
  }

  async findAllArticles(
    portalId: string,
    language?: string,
    isPublished?: boolean,
  ): Promise<SeoArticle[]> {
    return this.prisma.seoArticle.findMany({
      where: {
        portalId,
        ...(language && { language }),
        ...(isPublished !== undefined && { isPublished }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findArticle(id: string, portalId: string): Promise<SeoArticle> {
    const article = await this.prisma.seoArticle.findFirst({
      where: {
        id,
        portalId,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async updateArticle(
    id: string,
    portalId: string,
    dto: UpdateSeoArticleDto,
  ): Promise<SeoArticle> {
    const article = await this.prisma.seoArticle.findFirst({
      where: { id, portalId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.prisma.seoArticle.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        excerpt: dto.excerpt,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        keywords: dto.keywords,
        faqSchema: dto.faqSchema,
        ogImage: dto.ogImage,
        isPublished: dto.isPublished,
      },
    });
  }

  async removeArticle(id: string, portalId: string): Promise<void> {
    const article = await this.prisma.seoArticle.findFirst({
      where: { id, portalId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    await this.prisma.seoArticle.delete({
      where: { id },
    });
  }
}

