import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class UpdateInvoiceDto {
  @IsOptional()
  @IsNumberString()
  amount?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
