import { Body, Controller, Post, Res } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiRequestDto } from './dto/request.dto.js';

@Controller('auth')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('ai-request')
  async request(@Body() requestData: AiRequestDto) {
    return await this.aiService.aiRequest(requestData);
  }
}
