import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as ExcelJS from 'exceljs';
import { Repository } from 'typeorm';
import { Report } from './dataReport.entity';
import { UserData } from './types';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private dataReport: Repository<Report>,
  ) {}

  async getReportStatus(id: number): Promise<Report> {
    const report = await this.dataReport.findOne({ where: { id } });

    return { status: report.status, link: report.link, id: report.id };
  }

  //   'http://localhost:5112/data';
  //   'headers': ['id', 'name', 'age'];
  async createReport(dataEndpoint: string, headers: string[]): Promise<number> {
    const report = this.dataReport.create({
      status: 'pending',
      link: null,
    });
    await this.dataReport.save(report);

    const { data } = await axios.get(dataEndpoint);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.addRow(headers);
    data.forEach((item: UserData) => {
      worksheet.addRow(headers.map((header) => item[header]));
    });

    const filePath = `./dataReports/${report.id}.xlsx`;

    await workbook.xlsx.writeFile(filePath);

    report.status = 'completed';
    report.link = filePath;
    await this.dataReport.save(report);

    return report.id;
  }
}
