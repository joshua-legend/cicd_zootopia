import { Module } from '@nestjs/common';
import { ZookeepersService } from './zookeepers.service';
import { ZookeepersController } from './zookeepers.controller';
import { Zookeeper } from './entities/zookeeper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Zookeeper])],
  controllers: [ZookeepersController],
  providers: [ZookeepersService],
})
export class ZookeepersModule {}
