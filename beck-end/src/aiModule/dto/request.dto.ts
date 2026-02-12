import { IsString } from 'class-validator';

export class AiRequestDto {
  @IsString()
  userPrompt: string;
}
