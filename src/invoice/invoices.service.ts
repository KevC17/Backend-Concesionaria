import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(dto);
    return this.invoiceRepository.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async update(id: string, dto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOne(id);
    if (dto.amount) {
      invoice.amount = parseFloat(dto.amount);
    }
    if (dto.status) {
      invoice.status = dto.status;
    }
    return this.invoiceRepository.save(invoice);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.invoiceRepository.delete(id);
    return !!result.affected;
  }
}
