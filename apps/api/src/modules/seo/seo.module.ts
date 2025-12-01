import { Module } from '@nestjs/common';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';

@Module({
  imports: [],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {}

