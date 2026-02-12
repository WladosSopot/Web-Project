import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import path, { join } from 'path';
import { AuthModule } from './auth/auth.module.js';
import { AiModule } from './aiModule/ai.module.js';
import { HistoryModule } from './history/history.module';

const __dirname = path.resolve();

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
