import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { CarsModule } from '../cars/cars.module';
import { PaymentsModule } from '../payments/payments.module';
import { ReservationsModule } from '../reservation/reservations.module';
import { InvoicesModule } from '../invoice/invoices.module';

@Module({
  imports: [UsersModule, CarsModule, PaymentsModule, ReservationsModule, InvoicesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
