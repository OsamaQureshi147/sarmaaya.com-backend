import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverPort = process.env.SERVER_PORT || 5000;
  await app.listen(serverPort, () =>
    console.log(`App listening on port: ${serverPort}`),
  );
}

bootstrap();
