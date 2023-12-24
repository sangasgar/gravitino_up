import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto, UpdateFacilityDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('facility')
@Controller('facility')
export class FacilityController {
  constructor(
    private readonly facilityService: FacilityService,
    private readonly checkpointService: CheckpointService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFacilityDto: CreateFacilityDto, @Req() request) {
    const foundCheckpoint = await this.checkpointService.findOne(createFacilityDto.checkpoint_id);
    if (!foundCheckpoint) {
      throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.facilityService.create(createFacilityDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.facilityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateFacilityDto: UpdateFacilityDto, @Req() request) {
    let foundFacility = null;
    if (updateFacilityDto.facility_id) {
      foundFacility = await this.facilityService.findOne(updateFacilityDto.facility_id);
    }
    if (!foundFacility) {
      throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (updateFacilityDto.checkpoint_id) {
      const foundCheckpoint = await this.checkpointService.findOne(updateFacilityDto.checkpoint_id);
      if (!foundCheckpoint) {
        throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }


    return this.facilityService.update(updateFacilityDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundFacility = await this.facilityService.findOne(id);
    if (!foundFacility) {
      throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.facilityService.remove(+id, request.user.user_id);
  }
}
