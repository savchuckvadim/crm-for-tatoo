import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SerpPosition } from '@crm/prisma/generated/prisma';
import { CreateSerpPositionDto } from './dto/serp.dto';

@Injectable()
export class SerpService {
  constructor(private readonly prisma: PrismaService) {}

  async createPosition(portalId: string, dto: CreateSerpPositionDto): Promise<SerpPosition> {
    return this.prisma.serpPosition.create({
      data: {
        portalId,
        keywordId: dto.keywordId,
        position: dto.position,
        url: dto.url,
        searchEngine: dto.searchEngine || 'google',
        country: dto.country || 'us',
      },
    });
  }

  async findAllPositions(
    portalId: string,
    keywordId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<SerpPosition[]> {
    return this.prisma.serpPosition.findMany({
      where: {
        portalId,
        ...(keywordId && { keywordId }),
        ...(startDate && {
          createdAt: {
            gte: startDate,
          },
        }),
        ...(endDate && {
          createdAt: {
            lte: endDate,
          },
        }),
      },
      include: {
        keyword: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPositionHistory(
    portalId: string,
    keywordId: string,
    days: number = 30,
  ): Promise<SerpPosition[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.prisma.serpPosition.findMany({
      where: {
        portalId,
        keywordId,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getLatestPosition(portalId: string, keywordId: string): Promise<SerpPosition | null> {
    return this.prisma.serpPosition.findFirst({
      where: {
        portalId,
        keywordId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

