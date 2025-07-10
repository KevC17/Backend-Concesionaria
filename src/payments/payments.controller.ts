import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(dto);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Payment> {
    const payment = await this.paymentsService.findOne(id);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePaymentStatusDto,
  ): Promise<Payment> {
    const payment = await this.paymentsService.updateStatus(id, dto);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    const deleted = await this.paymentsService.remove(id);
    if (!deleted) throw new NotFoundException('Payment not found');
    return { message: 'Payment deleted successfully' };
  }
}
