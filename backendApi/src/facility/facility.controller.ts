import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('facility')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilityService.create(createFacilityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilityService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateFacilityDto: UpdateFacilityDto) {
    return this.facilityService.update(updateFacilityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facilityService.remove(+id);
  }
}
