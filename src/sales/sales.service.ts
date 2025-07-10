import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sales.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async create(dto: CreateSaleDto): Promise<Sale> {
    const sale = this.saleRepository.create(dto);
    return this.saleRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return this.saleRepository.find();
  }

  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleRepository.findOne({ where: { id } });
    if (!sale) throw new NotFoundException('Sale not found');
    return sale;
  }

  async update(id: string, dto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.findOne(id);
    Object.assign(sale, dto);
    return this.saleRepository.save(sale);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.saleRepository.delete(id);
    return !!result.affected;
  }
}
