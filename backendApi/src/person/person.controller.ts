import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(+id);
  }
}
