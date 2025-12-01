import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

@Module({
  imports: [],
  controllers: [ClientsController, LeadsController, DealsController],
  providers: [ClientsService, LeadsService, DealsService],
  exports: [ClientsService, LeadsService, DealsService],
})
export class CrmModule {}

