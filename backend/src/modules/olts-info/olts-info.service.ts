import { Injectable } from '@nestjs/common';
import { OltsInfo } from '@prisma/generated/client';
import { PaginatedQueryParamsDto } from 'src/utils/PaginatedQueryParams.dto';

import { PaginatedOutputDto } from '../../utils/PaginatedOutput.dto';

import { CreateOltInfosDto } from './dto/createOltInfos.dto';
import { CreateOltsInfoUseCase } from './use-cases/createOltInfos.usecase';
import { GetOltInfosByIdUseCase } from './use-cases/getOltInfosById.usecase';
import { GetAllOltsInfosUseCase } from './use-cases/getAllOltInfos.usecase';

@Injectable()
export class OltsInfoService {
  constructor(
    private readonly createOltsInfoUseCase: CreateOltsInfoUseCase,
    private readonly getAllOltsInfoUseCase: GetAllOltsInfosUseCase,
    private readonly getOltsInfoByIdUseCase: GetOltInfosByIdUseCase,
  ) {}

  async create(data: CreateOltInfosDto): Promise<OltsInfo | void> {
    return this.createOltsInfoUseCase.execute(data);
  }

  async getAll(
    filters: PaginatedQueryParamsDto,
  ): Promise<PaginatedOutputDto<OltsInfo>> {
    return this.getAllOltsInfoUseCase.execute(filters);
  }

  async getById(id: string): Promise<OltsInfo> {
    return this.getOltsInfoByIdUseCase.execute(id);
  }
}
