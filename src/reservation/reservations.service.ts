import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservations.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepo.create(dto);
    return this.reservationRepo.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateReservationDto): Promise<Reservation | null> {
    const reservation = await this.findOne(id);
    if (!reservation) return null;
    Object.assign(reservation, dto);
    return this.reservationRepo.save(reservation);
  }

  async remove(id: string): Promise<Reservation | null> {
    const reservation = await this.findOne(id);
    if (!reservation) return null;
    return this.reservationRepo.remove(reservation);
  }
}
