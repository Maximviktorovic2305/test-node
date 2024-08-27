import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReportService } from './datReport.service';


@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get(':id')
  getReportStatus(
    @Param('id') id: number,
  ): Promise<{ status: string; link?: string; id: number }> {
    return this.reportService.getReportStatus(id);
  }

  @Post()
  createReport(
    @Body() body: { endpoint: string; headers: string[] },
  ): Promise<number> {
    return this.reportService.createReport(body.endpoint, body.headers);
  }
}
