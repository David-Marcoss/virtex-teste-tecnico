import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OltsInfoModule } from './modules/olts-info/olts-info.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OltsInfoModule,
    PrismaModule,
  ],
  providers: [],
})
export class AppModule {}
