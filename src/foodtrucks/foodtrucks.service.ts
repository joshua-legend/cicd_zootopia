import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodtruckDto } from './dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from './dto/update-foodtruck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foodtrucks } from './entities/foodtruck.entity';
import { Areas } from 'src/areas/entities/area.entity';

@Injectable()
export class FoodtrucksService {
  constructor(
    @InjectRepository(Foodtrucks)
    private foodTruckRepository: Repository<Foodtrucks>,
    @InjectRepository(Areas)
    private areasRepository: Repository<Areas>,
  ) {}

  async create(createFoodtruckDto: CreateFoodtruckDto) {
    const area = await this.areasRepository.findOne({
      where: { id: createFoodtruckDto.area_id },
    });
    if (!area) throw new NotFoundException('그런 구역 없습니다.');
    const newFoodTruck = await this.foodTruckRepository.create({
      ...createFoodtruckDto,
      areas: area,
    });
    const result = await this.foodTruckRepository.save(newFoodTruck);
    return `${result.name}이 등록되었습니다.`;
  }

  findAll() {
    return `This action returns all foodtrucks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodtruck`;
  }

  update(id: number, updateFoodtruckDto: UpdateFoodtruckDto) {
    return `This action updates a #${id} foodtruck`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodtruck`;
  }
}
