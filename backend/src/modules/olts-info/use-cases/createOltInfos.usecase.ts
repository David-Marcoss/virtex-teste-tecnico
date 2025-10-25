import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OltsInfo } from '@prisma/generated/client';
import { v4 as uuidv4 } from 'uuid';
import { detectBufferMime } from 'mime-detect';

import { PrismaService } from '../../../database/PrismaService';
import { CreateOltInfosDto } from '../dto/createOltInfos.dto';

@Injectable()
export class CreateOltsInfoUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute(data: CreateOltInfosDto): Promise<OltsInfo | void> {
    const { oltFile } = data;
    const uploadPath = this.configService.get<string>(
      'UPLOAD_FILE_DIR',
      './upload/OltsInfo',
    );

    const savedFile = await this.saveFileFromBase64(
      oltFile.base64,
      oltFile.display_filename,
      uploadPath,
    );
  }

  private async convertBase64ToFile(base64String: string): Promise<Buffer> {
    const base64Data = base64String.replace(/^data:[^;]+;base64,/, '');

    const buffer = Buffer.from(base64Data, 'base64');

    return buffer;
  }

  private async mimeFromBuffer(buffer: Buffer) {
    try {
      // This may contain a ; in the mime type, plus encoding information
      // For example, "image/png;charset=utf-8"
      // We only want the mime type, so we split on the ; and take the first part
      const mimeType = await detectBufferMime(buffer);
      const fileType = mimeType.split(';')[0];
      return fileType || 'application/octet-stream';
    } catch (error) {
      console.warn(error);
      return 'application/octet-stream';
    }
  }

  async saveFileFromBase64(
    base64String: string,
    filename: string,
    uploadDir: string = './upload/OltsInfo',
  ): Promise<{ filePath: string; filename: string; mimetype: string }> {
    const fileBuffer = await this.convertBase64ToFile(base64String);

    const mimetype = await this.mimeFromBuffer(fileBuffer);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName =
      path.parse(filename).name.replace(/\s/g, '') + '-' + uuidv4();
    const extension = path.parse(filename)?.ext || '';
    const uniqueFilename = `${fileName}${extension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    fs.writeFileSync(filePath, fileBuffer);

    return {
      filePath,
      filename: uniqueFilename,
      mimetype,
    };
  }
}
