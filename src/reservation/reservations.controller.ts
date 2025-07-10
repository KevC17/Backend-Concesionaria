import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Post()
  async create(@Body() dto: CreateReservationDto) {
    const reservation = await this.service.create(dto);
    return new SuccessResponseDto('Reservation created successfully', reservation);
  }

  @Get()
  async findAll() {
    const result = await this.service.findAll();
    return new SuccessResponseDto('Reservations retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const reservation = await this.service.findOne(id);
    if (!reservation) throw new NotFoundException('Reservation not found');
    return new SuccessResponseDto('Reservation retrieved successfully', reservation);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    const reservation = await this.service.update(id, dto);
    if (!reservation) throw new NotFoundException('Reservation not found');
    return new SuccessResponseDto('Reservation updated successfully', reservation);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const reservation = await this.service.remove(id);
    if (!reservation) throw new NotFoundException('Reservation not found');
    return new SuccessResponseDto('Reservation deleted successfully', reservation);
  }
}
