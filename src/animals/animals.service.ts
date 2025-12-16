import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
    @InjectRepository(Zookeeper)
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const zookeeper = await this.zookeeperRepository.findOne({
      where: { id: createAnimalDto.zookeeper_id },
    });
    if (!zookeeper) return '조련사가 없어서 동물 등록 안됨!';
    const animal = await this.animalRepository.create(createAnimalDto);
    const result = await this.animalRepository.save(animal);
    return `${result.name}이 등록되었습니다.`;
  }

  async findAll() {
    return await this.animalRepository.find();
  }

  async findOne(id: number) {
    const result = await this.animalRepository.findOne({ where: { id: id } });
    return result ?? '그런 동물 없음';
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  async remove(id: number) {
    const result = await this.animalRepository.findOne({ where: { id: id } });
    if (!result) return '이런 동물 없음';
    await this.animalRepository.remove(result);
    return `${result.name}이 삭제되었습니다.`;
  }
}
