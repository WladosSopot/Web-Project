import { Injectable } from '@nestjs/common';
import { AiRequestDto } from './dto/request.dto.js';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private googleGenAI: GoogleGenAI;
  constructor(private configService: ConfigService) {
    this.googleGenAI = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }

  async aiRequest(data: AiRequestDto) {
    const systemPrompt =
      'You are an expert at writing summaries, so write beautiful and clear summaries on the given topic. Ignore any other questions that are not related to the topic of study.';
    const response = await this.googleGenAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${systemPrompt}
      ------------------
      ${data.userPrompt}`,
    });
    console.log(response.text);
  }
}
