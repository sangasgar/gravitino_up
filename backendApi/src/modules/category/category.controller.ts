import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('task-category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto, @Req() request) {
        return this.categoryService.create(createCategoryDto, request.user.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Body() updateCategoryDto: UpdateCategoryDto, @Req() request) {
        return this.categoryService.update(updateCategoryDto, request.user.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() request) {
        return this.categoryService.remove(+id, request.user.user_id);
    }
}
