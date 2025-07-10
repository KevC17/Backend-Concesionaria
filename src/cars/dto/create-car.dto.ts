import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

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
}
