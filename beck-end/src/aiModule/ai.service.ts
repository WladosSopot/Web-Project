import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiRequestDto } from './dto/request.dto';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { HistoryService } from '../history/history.service';

@Injectable()
export class AiService {
  private googleGenAI: GoogleGenAI;
  constructor(
    private configService: ConfigService,
    private readonly historyService: HistoryService,
  ) {
    this.googleGenAI = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }

  async aiRequest(data: AiRequestDto, userId: number): Promise<string> {
    const systemPrompt =
      'You are an expert at writing summaries, so write beautiful and clear summaries on the given topic. Ignore any other questions that are not related to the topic of study.';
    const response = await this.googleGenAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${systemPrompt}
      ------------------
      ${data.userPrompt}`,
    });
    if (!response.text) {
      return 'Error';
    }
    await this.saveHistory(userId, data.conspectName, response.text);
    return response.text;
  }

  async saveHistory(userId: number, conspectName: string, text: string) {
    try {
      await this.historyService.create({
        title: conspectName,
        text,
        userId,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error saving a history');
    }
  }
}
