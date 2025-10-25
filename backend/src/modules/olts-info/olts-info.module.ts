import { Module } from '@nestjs/common';

import { OltsInfoService } from './olts-info.service';
import { OltsInfoController } from './olts-info.controller';
import { CreateOltsInfoUseCase } from './use-cases/createOltInfos.usecase';
import { GetOltInfosByIdUseCase } from './use-cases/getOltInfosById.usecase';
import { GetAllOltsInfosUseCase } from './use-cases/getAllOltInfos.usecase';

@Module({
  providers: [
    OltsInfoService,
    GetOltInfosByIdUseCase,
    CreateOltsInfoUseCase,
    GetAllOltsInfosUseCase,
  ],
  controllers: [OltsInfoController],
  exports: [OltsInfoService],
})
export class OltsInfoModule {}
