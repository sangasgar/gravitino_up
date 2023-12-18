import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('facility')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) { }

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilityService.create(createFacilityDto);
  }

  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateFacilityDto: UpdateFacilityDto) {
    return this.facilityService.update(updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facilityService.remove(+id);
  }
}
