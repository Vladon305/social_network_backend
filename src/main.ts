import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Social network by Vladon305')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Vladon305')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(Number(process.env.PORT) | 4000, () => console.log(`started on port`))
}
bootstrap()
