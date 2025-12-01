import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.mpdule';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from './common/utils/is-dev';
import { AuthModule } from './modules/auth/auth.module';
import { PortalsModule } from './modules/portals/portals.module';
import { CrmModule } from './modules/crm/crm.module';
import { ProductsModule } from './modules/products/products.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { CustomFieldsModule } from './modules/custom-fields/custom-fields.module';
import { SeoModule } from './modules/seo/seo.module';
import { SerpModule } from './modules/serp/serp.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    PrismaModule,
    UserModule,
    ChatModule,
    AuthModule,
    PortalsModule,
    CrmModule,
    ProductsModule,
    AppointmentsModule,
    CustomFieldsModule,
    SeoModule,
    SerpModule,
    IntegrationsModule,
    NotificationsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
