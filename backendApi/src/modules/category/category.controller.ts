import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { HasPermissions } from '../auth/guards/permissions.decorator';
import { PermissionEnum } from '../auth/guards/enums/permission.enum';
import { PermissionsGuard } from '../auth/guards/permission.guard';

@ApiBearerAuth()
@ApiTags('task-category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @HasPermissions(PermissionEnum.CategoryCreate)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
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

    @HasPermissions(PermissionEnum.CategoryUpdate)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Patch(':id')
    update(@Body() updateCategoryDto: UpdateCategoryDto, @Req() request) {
        return this.categoryService.update(updateCategoryDto, request.user.user_id);
    }

    @HasPermissions(PermissionEnum.CategoryDelete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() request) {
        return this.categoryService.remove(+id, request.user.user_id);
    }
}
