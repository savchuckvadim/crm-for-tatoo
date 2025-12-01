import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomField, EntityType, FieldType } from '@crm/prisma/generated/prisma';
import { CreateCustomFieldDto, UpdateCustomFieldDto } from './dto/custom-fields.dto';

@Injectable()
export class CustomFieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(portalId: string, dto: CreateCustomFieldDto): Promise<CustomField> {
    // Get max order for this entity type
    const maxOrder = await this.prisma.customField.findFirst({
      where: {
        portalId,
        entityType: dto.entityType,
      },
      orderBy: { order: 'desc' },
    });

    return this.prisma.customField.create({
      data: {
        portalId,
        entityType: dto.entityType,
        name: dto.name,
        fieldType: dto.fieldType,
        config: dto.config || {},
        isRequired: dto.isRequired || false,
        order: (maxOrder?.order || 0) + 1,
      },
    });
  }

  async findAll(portalId: string, entityType?: EntityType): Promise<CustomField[]> {
    return this.prisma.customField.findMany({
      where: {
        portalId,
        ...(entityType && { entityType }),
      },
      include: {
        values: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string, portalId: string): Promise<CustomField> {
    const field = await this.prisma.customField.findFirst({
      where: {
        id,
        portalId,
      },
      include: {
        values: true,
      },
    });

    if (!field) {
      throw new NotFoundException('Custom field not found');
    }

    return field;
  }

  async update(
    id: string,
    portalId: string,
    dto: UpdateCustomFieldDto,
  ): Promise<CustomField> {
    const field = await this.prisma.customField.findFirst({
      where: { id, portalId },
    });

    if (!field) {
      throw new NotFoundException('Custom field not found');
    }

    return this.prisma.customField.update({
      where: { id },
      data: {
        name: dto.name,
        fieldType: dto.fieldType,
        config: dto.config,
        isRequired: dto.isRequired,
        order: dto.order,
      },
    });
  }

  async remove(id: string, portalId: string): Promise<void> {
    const field = await this.prisma.customField.findFirst({
      where: { id, portalId },
    });

    if (!field) {
      throw new NotFoundException('Custom field not found');
    }

    await this.prisma.customField.delete({
      where: { id },
    });
  }

  async setValue(
    fieldId: string,
    entityType: EntityType,
    entityId: string,
    value: any,
  ): Promise<void> {
    await this.prisma.customFieldValue.upsert({
      where: {
        fieldId_entityType_entityId: {
          fieldId,
          entityType,
          entityId,
        },
      },
      create: {
        fieldId,
        entityType,
        entityId,
        value,
      },
      update: {
        value,
      },
    });
  }

  async getValues(entityType: EntityType, entityId: string): Promise<any[]> {
    return this.prisma.customFieldValue.findMany({
      where: {
        entityType,
        entityId,
      },
      include: {
        field: true,
      },
    });
  }
}

