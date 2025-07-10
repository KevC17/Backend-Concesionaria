import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create({
      ...dto,
      status: PaymentStatus.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, dto: UpdatePaymentStatusDto): Promise<Payment | null> {
    const payment = await this.findOne(id);
    if (!payment) return null;
    payment.status = dto.status;
    return this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.paymentRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
