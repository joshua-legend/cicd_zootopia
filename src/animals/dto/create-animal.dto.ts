import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  systematics: string;

  @IsNumber()
  @IsPositive()
  count: number;

  @IsNumber()
  @IsPositive()
  zookeeper_id: number;
}
