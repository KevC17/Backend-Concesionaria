import { IsUUID, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  reservationId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  status: string;
}
