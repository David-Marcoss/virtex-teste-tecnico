import { ApiProperty } from '@nestjs/swagger';
import { OltTypeEnum, StateEnum } from '@prisma/generated/enums';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginatedQueryParamsDto } from 'src/utils/PaginatedQueryParams.dto';

export class OltInfosSearchFilters extends PaginatedQueryParamsDto {
  @ApiProperty({
    description: 'display file name',
    example: OltTypeEnum.HUAWEI,
    enum: OltTypeEnum,
  })
  @IsOptional()
  @IsEnum(OltTypeEnum)
  oltType?: OltTypeEnum;

  @ApiProperty({
    description: 'display file name',
    example: StateEnum.ONLINE,
    enum: StateEnum,
  })
  @IsOptional()
  @IsEnum(StateEnum)
  state?: StateEnum;
}
