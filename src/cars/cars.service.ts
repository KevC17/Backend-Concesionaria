import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { paginateMongo, IPaginationOptions, Pagination } from 'src/common/pagination/paginate-mongo';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<CarDocument>) {}

  async create(dto: CreateCarDto): Promise<Car> {
    const createdCar = new this.carModel(dto);
    return createdCar.save();
  }

  async findAll(
    options: IPaginationOptions,
    available?: boolean,
    search?: string,
  ): Promise<Pagination<Car>> {
    const filter: any = {};

    if (available !== undefined) {
      filter.available = available;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { brand: regex },
        { model: regex },
      ];
    }

    return paginateMongo<Car>(this.carModel, options, filter);
  }

  async findOne(id: string): Promise<Car | null> {
    return this.carModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateCarDto): Promise<Car | null> {
    return this.carModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Car | null> {
    return this.carModel.findByIdAndDelete(id).exec();
  }
}
