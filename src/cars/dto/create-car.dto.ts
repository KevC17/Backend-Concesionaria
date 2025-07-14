import { IsString, IsNumber, IsBoolean, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsString()
  vin: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsOptional()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  image?: string;

  @IsNumber()
  @Min(0)
  price: number;  // <-- requerido y mínimo 0
}
