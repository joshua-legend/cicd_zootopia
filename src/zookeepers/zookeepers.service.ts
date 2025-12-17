import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZookeeperDto } from './dto/create-zookeeper.dto';
import { UpdateZookeeperDto } from './dto/update-zookeeper.dto';
import { Zookeeper } from './entities/zookeeper.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ZookeepersService {
  constructor(
    @InjectRepository(Zookeeper)
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}
  async create(createZookeeperDto: CreateZookeeperDto) {
    const zookeeper = await this.zookeeperRepository.create(createZookeeperDto);
    const result = await this.zookeeperRepository.save(zookeeper);
    return `${result.name}이 등록되었습니다.`;
  }

  async findAll() {
    return await this.zookeeperRepository.find();
  }

  async findOne(id: number) {
    const result = await this.zookeeperRepository.findOne({
      where: { id },
    });
    if (!result) throw new NotFoundException('그런 주키퍼 없음 ㅋㅋ');
    return result;
  }

  update(id: number, updateZookeeperDto: UpdateZookeeperDto) {
    return `This action updates a #${id} zookeeper`;
  }

  async remove(id: number) {
    const result = await this.zookeeperRepository.findOne({
      where: { id: id },
    });
    if (!result) throw new NotFoundException('그런 주키퍼 없음 ㅋㅋ');
    await this.zookeeperRepository.remove(result);
    return `${result.name}이 삭제되었습니다.`;
  }
}
