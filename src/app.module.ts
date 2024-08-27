import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ReportModule } from './datareports/dataReport.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ReportModule],
})
export class AppModule {}
