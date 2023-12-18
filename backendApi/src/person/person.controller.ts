import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(+id);
  }
}
