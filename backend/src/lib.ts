import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configureApp(app: INestApplication<any>) {
  // Adiciona o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // Lança erro para propriedades não declaradas
      transform: true, // Transforma os dados recebidos em objetos dos tipos esperados
    }),
  );
}
