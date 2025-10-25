import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum OltFileType {
  'HUAWE',
  'ZTE_STATE',
  'ZTE',
}

export class FileDto {
  @ApiProperty({
    description: 'display file name',
    example: 'file.txt',
  })
  @IsString()
  display_filename: string;

  @ApiProperty({
    description: 'display file type',
    example: 'text/plain',
  })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiProperty({
    description: 'base64 file',
  })
  @IsString()
  base64: string;
}

export class CreateOltInfosDto {
  @ApiProperty({
    description: 'olt file',
    type: FileDto,
  })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  oltFile: FileDto;

  @ApiProperty({
    description: 'display file name',
    example: OltFileType.HUAWE,
    enum: OltFileType,
  })
  @IsEnum(OltFileType)
  oltType: OltFileType;
}
