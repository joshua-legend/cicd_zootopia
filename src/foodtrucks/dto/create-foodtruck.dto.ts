import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFoodtruckDto {
  @IsString()
  name: string;
  @IsString()
  owner: string;
  @IsString()
  main: string;
  @IsString()
  subs: string;

  @IsNumber()
  @IsPositive()
  area_id: number;
}
