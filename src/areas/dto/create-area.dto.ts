import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  name: string;
  @IsNumber()
  @IsPositive()
  size: number;
}
