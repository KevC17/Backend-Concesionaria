import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() dto: CreateSaleDto) {
    const sale = await this.salesService.create(dto);
    return new SuccessResponseDto('Sale created successfully', sale);
  }

  @Get()
  async findAll() {
    const sales = await this.salesService.findAll();
    return new SuccessResponseDto('Sales retrieved successfully', sales);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sale = await this.salesService.findOne(id);
    return new SuccessResponseDto('Sale retrieved successfully', sale);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    const sale = await this.salesService.update(id, dto);
    return new SuccessResponseDto('Sale updated successfully', sale);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const success = await this.salesService.remove(id);
    return new SuccessResponseDto('Sale deleted successfully', { success });
  }
}
