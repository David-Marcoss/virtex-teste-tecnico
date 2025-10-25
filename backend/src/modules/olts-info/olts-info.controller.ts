import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OltsInfo } from '@prisma/generated/client';
import { PaginatedOutputDto } from 'src/utils/PaginatedOutput.dto';
import { PaginatedQueryParamsDto } from 'src/utils/PaginatedQueryParams.dto';

import { OltsInfoService } from './olts-info.service';
import { CreateOltInfosDto } from './dto/createOltInfos.dto';

@ApiTags('oltsInfo')
@ApiBearerAuth()
@Controller('api/v1/oltsInfo')
export class OltsInfoController {
  constructor(private readonly oltsInfoService: OltsInfoService) {}

  @ApiOperation({ summary: 'Register a new oltsInfo' })
  @ApiResponse({
    status: 201,
    description: 'OltsInfo successfully registered',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('')
  create(@Body() data: CreateOltInfosDto) {
    return this.oltsInfoService.create(data);
  }

  @ApiOperation({ summary: 'Get OltsInfo information by id' })
  @ApiResponse({
    status: 200,
    description: 'OltsInfo information successfully retrieved',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.oltsInfoService.getById(id);
  }

  @ApiOperation({ summary: 'Get All oltsInfo information' })
  @ApiResponse({
    status: 200,
    description: 'OltsInfo information successfully getByIdd',
  })
  @Get()
  async getAll(
    @Query() queryParams: PaginatedQueryParamsDto,
  ): Promise<PaginatedOutputDto<OltsInfo>> {
    return this.oltsInfoService.getAll(queryParams);
  }
}
