import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendEmailDto, SendSMSDto } from './dto/notifications.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portals/:portalId/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  @ApiOperation({ summary: 'Send email notification' })
  async sendEmail(@Body() dto: SendEmailDto) {
    await this.notificationsService.sendEmail(dto.to, dto.subject, dto.body);
    return { message: 'Email sent successfully' };
  }

  @Post('sms')
  @ApiOperation({ summary: 'Send SMS notification' })
  async sendSMS(@Body() dto: SendSMSDto) {
    await this.notificationsService.sendSMS(dto.to, dto.message);
    return { message: 'SMS sent successfully' };
  }

  @Post('telegram')
  @ApiOperation({ summary: 'Send Telegram notification' })
  async sendTelegram(@Body('chatId') chatId: string, @Body('message') message: string) {
    await this.notificationsService.sendTelegram(chatId, message);
    return { message: 'Telegram message sent successfully' };
  }

  @Post('slack')
  @ApiOperation({ summary: 'Send Slack notification' })
  async sendSlack(@Body('webhookUrl') webhookUrl: string, @Body('message') message: string) {
    await this.notificationsService.sendSlack(webhookUrl, message);
    return { message: 'Slack message sent successfully' };
  }
}

