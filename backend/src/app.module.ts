import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OltsInfoModule } from './modules/olts-info/olts-info.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OltsInfoModule],
  providers: [],
})
export class AppModule {}
