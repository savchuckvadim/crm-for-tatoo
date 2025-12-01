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
} from '@nestjs/common';
import { PortalsService } from './portals.service';
import { CreatePortalDto, UpdatePortalDto } from './dto/portals.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Portals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals')
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new portal' })
  async create(@Req() req, @Body() dto: CreatePortalDto) {
    return this.portalsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all portals for current user' })
  async findAll(@Req() req) {
    return this.portalsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get portal by ID' })
  async findOne(@Param('id') id: string, @Req() req) {
    return this.portalsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update portal' })
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body() dto: UpdatePortalDto,
  ) {
    return this.portalsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete portal' })
  async remove(@Param('id') id: string, @Req() req) {
    await this.portalsService.remove(id, req.user.id);
    return { message: 'Portal deleted successfully' };
  }

  @Post(':id/users/:userId')
  @ApiOperation({ summary: 'Add user to portal with role' })
  async addUser(
    @Param('id') portalId: string,
    @Param('userId') userId: string,
    @Req() req,
    @Body('role') role: string,
  ) {
    await this.portalsService.addUserToPortal(
      portalId,
      req.user.id,
      userId,
      role,
    );
    return { message: 'User added to portal successfully' };
  }
}

