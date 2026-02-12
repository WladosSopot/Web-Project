import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
