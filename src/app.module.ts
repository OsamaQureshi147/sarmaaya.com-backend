import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
