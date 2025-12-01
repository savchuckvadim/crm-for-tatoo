import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '@crm/prisma/generated/prisma';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        portalId,
        name: dto.name,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        currency: dto.currency || 'EUR',
        duration: dto.duration,
        portfolio: dto.portfolio || [],
        isActive: dto.isActive !== undefined ? dto.isActive : true,
        metadata: dto.metadata || {},
      },
    });
  }

  async findAll(portalId: string, category?: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        portalId,
        isActive: true,
        ...(category && { category }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        portalId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id, portalId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        currency: dto.currency,
        duration: dto.duration,
        portfolio: dto.portfolio,
        isActive: dto.isActive,
        metadata: dto.metadata,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const product = await this.prisma.product.findFirst({
      where: { id, portalId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { id },
    });
  }
}

