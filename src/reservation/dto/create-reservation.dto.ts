import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  customerName: string;

  @IsUUID()
  carId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
