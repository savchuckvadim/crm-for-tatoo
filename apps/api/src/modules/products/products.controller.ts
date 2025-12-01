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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product/service' })
  async create(
    @Param('portalId') portalId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(portalId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for portal' })
  async findAll(
    @Param('portalId') portalId: string,
    @Query('category') category?: string,
  ) {
    return this.productsService.findAll(portalId, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  async findOne(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    return this.productsService.findOne(id, portalId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  async update(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, portalId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  async remove(
    @Param('id') id: string,
    @Param('portalId') portalId: string,
  ) {
    await this.productsService.remove(id, portalId);
    return { message: 'Product deleted successfully' };
  }
}

