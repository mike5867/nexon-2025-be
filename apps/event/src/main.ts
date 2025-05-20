import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 5001,
      },
    },
  );
  await app.listen();
}
bootstrap();
