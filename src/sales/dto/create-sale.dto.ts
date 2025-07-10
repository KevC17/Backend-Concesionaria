import { IsUUID, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  carId: string;

  @IsDecimal()
  price: number;
}
