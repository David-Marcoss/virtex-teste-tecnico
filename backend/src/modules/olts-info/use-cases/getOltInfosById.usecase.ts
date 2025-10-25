import { Injectable, NotFoundException } from '@nestjs/common';
import { OltsInfo, PrismaClient } from '@prisma/generated/client';

import { PrismaService } from '../../../database/PrismaService';

@Injectable()
export class GetOltInfosByIdUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    id: string,
    prismaClient: PrismaClient = this.prismaService,
  ): Promise<OltsInfo> {
    const file = await prismaClient.oltsInfo.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      throw new NotFoundException('OltInfo not found');
    }

    return file;
  }
}
