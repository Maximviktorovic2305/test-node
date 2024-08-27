import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report } from './dataReport.entity';
import { ReportService } from './datReport.service';
import { ReportController } from './dataReport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
