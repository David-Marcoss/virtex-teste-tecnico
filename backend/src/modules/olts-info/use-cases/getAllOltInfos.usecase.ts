import { Injectable } from '@nestjs/common';
import { Prisma, OltsInfo } from '@prisma/generated/client';
import { ConfigService } from '@nestjs/config';
import { createPaginator } from 'prisma-pagination';

import { PaginatedOutputDto } from '../../../utils/PaginatedOutput.dto';
import { PrismaService } from '../../../database/PrismaService';
import { OltInfosSearchFilters } from '../dto/oltInfosSearchFilters.dto';

@Injectable()
export class GetAllOltsInfosUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute({
    search,
    page,
    perPage,
    oltType,
    state,
  }: OltInfosSearchFilters): Promise<PaginatedOutputDto<OltsInfo>> {
    const envPerPage =
      this.configService.get<number>('NUMBER_ITEMS_PERPAGE') || 10;
    const paginate = createPaginator({ perPage: perPage || envPerPage });

    const where: Prisma.OltsInfoWhereInput = {
      OR: search
        ? [{ sn: { contains: search, mode: 'insensitive' } }]
        : undefined,
      oltType,
      state,
    };

    const { data, meta } = await paginate<
      OltsInfo,
      Prisma.OltsInfoFindManyArgs
    >(
      this.prisma.oltsInfo,
      {
        where,
        orderBy: { id: 'desc' },
      },
      { page: page },
    );

    return {
      data,
      meta,
    };
  }
}
