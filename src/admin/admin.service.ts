import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { PaymentsService } from '../payments/payments.service';
import { ReservationsService } from '../reservation/reservations.service';
import { InvoicesService } from '../invoice/invoices.service';
import { CreateInvoiceDto } from '../invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../invoice/dto/update-invoice.dto';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

import { CreateCarDto } from '../cars/dto/create-car.dto';
import { UpdateCarDto } from '../cars/dto/update-car.dto';

import { CreatePaymentDto, UpdatePaymentStatusDto } from '../payments/dto/payment.dto';

import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from '../reservation/dto/update-reservation.dto';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private carsService: CarsService,
    private paymentsService: PaymentsService,
    private reservationsService: ReservationsService,
    private invoicesService: InvoicesService,
  ) {}

  getAllUsers(page: number, limit: number) {
    return this.usersService.findAll({ page, limit });
  }
  getUserById(id: string) {
    return this.usersService.findOne(id);
  }
  createUser(dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  updateUser(id: string, dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
  deleteUser(id: string) {
    return this.usersService.remove(id);
  }

  getAllCars(page: number, limit: number, available?: boolean) {
    return this.carsService.findAll({ page, limit }, available);
  }
  getCarById(id: string) {
    return this.carsService.findOne(id);
  }
  createCar(dto: CreateCarDto) {
    return this.carsService.create(dto);
  }
  updateCar(id: string, dto: UpdateCarDto) {
    return this.carsService.update(id, dto);
  }
  deleteCar(id: string) {
    return this.carsService.remove(id);
  }

  getAllPayments() {
    return this.paymentsService.findAll();
  }
  getPaymentById(id: string) {
    return this.paymentsService.findOne(id);
  }
  createPayment(dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }
  updatePayment(id: string, dto: UpdatePaymentStatusDto) {
    return this.paymentsService.updateStatus(id, dto);
  }
  deletePayment(id: string) {
    return this.paymentsService.remove(id);
  }

  getAllReservations() {
    return this.reservationsService.findAll();
  }
  getReservationById(id: string) {
    return this.reservationsService.findOne(id);
  }
  createReservation(dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }
  updateReservation(id: string, dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto);
  }
  deleteReservation(id: string) {
    return this.reservationsService.remove(id);
  }

  getAllInvoices() {
    return this.invoicesService.findAll();
  }
  getInvoiceById(id: string) {
    return this.invoicesService.findOne(id);
  }
  createInvoice(dto: CreateInvoiceDto) {
    return this.invoicesService.create(dto);
  }
  updateInvoice(id: string, dto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, dto);
  }
  deleteInvoice(id: string) {
    return this.invoicesService.remove(id);
  }
}
