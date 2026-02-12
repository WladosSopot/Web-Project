import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AuthModule } from './auth/auth.module.js';
import { AiModule } from './aiModule/ai.module.js';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'data/dev.sqlite',
      synchronize: false,
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
    }),
    UserModule,
    HistoryModule,
    AuthModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
