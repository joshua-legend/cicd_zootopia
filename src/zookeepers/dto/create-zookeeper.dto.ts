import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateZookeeperDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsString()
  position: string;
}
