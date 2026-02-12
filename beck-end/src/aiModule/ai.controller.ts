import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './dto/request.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @UseGuards(AuthGuard)
  @Post('request')
  async request(
    @Body() requestData: AiRequestDto,
    @Req() req,
  ): Promise<string> {
    return await this.aiService.aiRequest(requestData, req.user.id);
  }
}
