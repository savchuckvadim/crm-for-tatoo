import { Module } from '@nestjs/common';
import { SerpController } from './serp.controller';
import { SerpService } from './serp.service';

@Module({
  imports: [],
  controllers: [SerpController],
  providers: [SerpService],
  exports: [SerpService],
})
export class SerpModule {}

