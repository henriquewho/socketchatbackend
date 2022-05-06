import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.port || 3003; 

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}
bootstrap();
