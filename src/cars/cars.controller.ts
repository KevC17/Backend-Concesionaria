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
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './schemas/car.schema';
import { Pagination } from 'src/common/pagination/paginate-mongo';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('available') available?: string,
  ): Promise<Pagination<Car>> {
    const isAvailable = available === undefined ? undefined : available === 'true';
    return this.carsService.findAll({ page, limit }, isAvailable);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    const car = await this.carsService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    const updatedCar = await this.carsService.update(id, updateCarDto);
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
    return updatedCar;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.carsService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Car not found');
    }
    return { message: 'Car deleted successfully' };
  }
}
