import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateInvoiceDto } from '../invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../invoice/dto/update-invoice.dto';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

import { CreateCarDto } from '../cars/dto/create-car.dto';
import { UpdateCarDto } from '../cars/dto/update-car.dto';

import { CreatePaymentDto, UpdatePaymentStatusDto } from '../payments/dto/payment.dto';

import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from '../reservation/dto/update-reservation.dto';


@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Users
  @Get('users')
  getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.adminService.getAllUsers(page, limit);
  }


  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.adminService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.adminService.createUser(dto);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updated = await this.adminService.updateUser(id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.adminService.deleteUser(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  // Cars
  @Get('cars')
  getCars(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('available') available?: string,
  ) {
    const isAvailable = available === undefined ? undefined : available === 'true';
    return this.adminService.getAllCars(page, limit, isAvailable);
  }

  @Get('cars/:id')
  async getCar(@Param('id') id: string) {
    const car = await this.adminService.getCarById(id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  @Post('cars')
  createCar(@Body() dto: CreateCarDto) {
    return this.adminService.createCar(dto);
  }

  @Put('cars/:id')
  async updateCar(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    const updated = await this.adminService.updateCar(id, dto);
    if (!updated) throw new NotFoundException('Car not found');
    return updated;
  }

  @Delete('cars/:id')
  async deleteCar(@Param('id') id: string) {
    const deleted = await this.adminService.deleteCar(id);
    if (!deleted) throw new NotFoundException('Car not found');
    return { message: 'Car deleted successfully' };
  }

  // Payments
  @Get('payments')
  getPayments() {
    return this.adminService.getAllPayments();
  }

  @Get('payments/:id')
  async getPayment(@Param('id') id: string) {
    const payment = await this.adminService.getPaymentById(id);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  @Post('payments')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.adminService.createPayment(dto);
  }

  @Put('payments/:id')
  async updatePayment(@Param('id') id: string, @Body() dto: UpdatePaymentStatusDto) {
    const updated = await this.adminService.updatePayment(id, dto);
    if (!updated) throw new NotFoundException('Payment not found');
    return updated;
  }

  @Delete('payments/:id')
  async deletePayment(@Param('id') id: string) {
    const deleted = await this.adminService.deletePayment(id);
    if (!deleted) throw new NotFoundException('Payment not found');
    return { message: 'Payment deleted successfully' };
  }

  // Reservations
  @Get('reservations')
  getReservations() {
    return this.adminService.getAllReservations();
  }

  @Get('reservations/:id')
  async getReservation(@Param('id') id: string) {
    const reservation = await this.adminService.getReservationById(id);
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  @Post('reservations')
  createReservation(@Body() dto: CreateReservationDto) {
    return this.adminService.createReservation(dto);
  }

  @Put('reservations/:id')
  async updateReservation(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    const updated = await this.adminService.updateReservation(id, dto);
    if (!updated) throw new NotFoundException('Reservation not found');
    return updated;
  }

  @Delete('reservations/:id')
  async deleteReservation(@Param('id') id: string) {
    const deleted = await this.adminService.deleteReservation(id);
    if (!deleted) throw new NotFoundException('Reservation not found');
    return { message: 'Reservation deleted successfully' };
  }

  // Invoices
  @Get('invoices')
  getInvoices() {
    return this.adminService.getAllInvoices();
  }

  @Get('invoices/:id')
  async getInvoice(@Param('id') id: string) {
    const invoice = await this.adminService.getInvoiceById(id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  @Post('invoices')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.adminService.createInvoice(dto);
  }

  @Put('invoices/:id')
  async updateInvoice(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    const updated = await this.adminService.updateInvoice(id, dto);
    if (!updated) throw new NotFoundException('Invoice not found');
    return updated;
  }

  @Delete('invoices/:id')
  async deleteInvoice(@Param('id') id: string) {
    const deleted = await this.adminService.deleteInvoice(id);
    if (!deleted) throw new NotFoundException('Invoice not found');
    return { message: 'Invoice deleted successfully' };
  }
}
