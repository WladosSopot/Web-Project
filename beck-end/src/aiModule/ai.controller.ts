import { Body, Controller, Post, Res } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiRequestDto } from './dto/request.dto.js';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('request')
  async request(@Body() requestData: AiRequestDto): Promise<string> {
    return await this.aiService.aiRequest(requestData);
  }
}
