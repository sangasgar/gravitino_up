import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Get('all')
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(+id);
  }
}
