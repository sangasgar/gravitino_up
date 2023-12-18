import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task-category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(+id);
    }

    @Patch(':id')
    update(@Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.remove(+id);
    }
}
