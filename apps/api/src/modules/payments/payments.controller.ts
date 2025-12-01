import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, CreateSubscriptionDto } from './dto/payments.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  async createPayment(
    @Param('portalId') portalId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentsService.createPayment(portalId, dto);
  }

  @Post('subscriptions')
  @ApiOperation({ summary: 'Create a subscription' })
  async createSubscription(
    @Param('portalId') portalId: string,
    @Body() dto: CreateSubscriptionDto,
  ) {
    return this.paymentsService.createSubscription(portalId, dto);
  }

  @Post('webhooks/:provider')
  @ApiOperation({ summary: 'Handle payment webhook' })
  async handleWebhook(
    @Param('portalId') portalId: string,
    @Param('provider') provider: string,
    @Body() payload: any,
  ) {
    return this.paymentsService.handleWebhook(portalId, provider, payload);
  }
}

