import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsModule } from './animals/animals.module';
import { ZookeepersModule } from './zookeepers/zookeepers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'zoo', // DB 이름
      synchronize: true, // 개발 환경에서만 true (자동 테이블 생성)
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 전체 엔티디 등록
    }),
    AnimalsModule,
    ZookeepersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
