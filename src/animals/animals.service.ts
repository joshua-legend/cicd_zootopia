import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!zookeeper) throw new NotFoundException('그런 조련사 없음');
    const animal = await this.animalRepository.create({
      ...createAnimalDto,
      zookeeper: zookeeper, // zookeeper 관계 객체를 설정
    });
    const result = await this.animalRepository.save(animal);
    return `${result.name}이 등록되었습니다.`;
  }

  async findAll() {
    return await this.animalRepository.find();
  }

  async findOne(id: number) {
    const result = await this.animalRepository.findOne({ where: { id: id } });
    if (!result) throw new NotFoundException('그런 동물 없어!');
    return result;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  async remove(id: number) {
    const result = await this.animalRepository.findOne({ where: { id: id } });
    if (!result) throw new NotFoundException('그런 동물 없어!');
    await this.animalRepository.remove(result);
    return `${result.name}이 삭제되었습니다.`;
  }
}
