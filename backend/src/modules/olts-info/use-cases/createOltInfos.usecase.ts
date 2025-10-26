import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { detectBufferMime } from 'mime-detect';
import { OltTypeEnum } from '@prisma/generated/enums';

import { TxClient } from '../../../database/PrismaTransactionType';
import { PrismaService } from '../../../database/PrismaService';
import { CreateOltInfosDto } from '../dto/createOltInfos.dto';
import { IOntInfo } from '../types/IOltInfo';
import { parseHuawei } from '../utils/parseHuawei';
import { parseZteSn } from '../utils/parseZteSn';
import { parseZteState } from '../utils/parseZteState';

@Injectable()
export class CreateOltsInfoUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute(data: CreateOltInfosDto): Promise<void> {
    const { oltFile, oltType } = data;

    const { content, mimetype } = await this.readFileFromBase64(oltFile.base64);

    if (mimetype !== 'text/plain') {
      throw new BadRequestException('Invalid file type.');
    }

    const ontInfo = this.parseOntInfoData(content, oltType);

    await this.createOntInfo(ontInfo, oltType);
  }

  private async createOntInfo(
    ontInfo: IOntInfo[],
    oltType: OltTypeEnum,
  ): Promise<void> {
    await this.prismaService.$transaction(async (tx: TxClient) => {
      await tx.oltsInfo.createMany({
        data: ontInfo.map((item) => ({ ...item, oltType })),
      });
    });
  }

  private parseOntInfoData(
    fileContent: string,
    oltType: OltTypeEnum,
  ): IOntInfo[] {
    switch (oltType) {
      case OltTypeEnum.HUAWEI:
        return parseHuawei(fileContent);
      case OltTypeEnum.ZTE:
        return parseZteSn(fileContent);
      case OltTypeEnum.ZTE_STATE:
        return parseZteState(fileContent);
      default:
        return [];
    }
  }

  private async convertBase64ToFile(base64String: string): Promise<Buffer> {
    const base64Data = base64String.replace(/^data:[^;]+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  private async mimeFromBuffer(buffer: Buffer) {
    try {
      const mimeType = await detectBufferMime(buffer);
      const fileType = mimeType.split(';')[0];
      return fileType || 'application/octet-stream';
    } catch (error) {
      console.warn(error);
      return 'application/octet-stream';
    }
  }

  async readFileFromBase64(base64String: string): Promise<{
    content: string;
    mimetype: string;
  }> {
    const fileBuffer = await this.convertBase64ToFile(base64String);
    const mimetype = await this.mimeFromBuffer(fileBuffer);

    const content = fileBuffer.toString('utf-8');

    return { content, mimetype };
  }
}
