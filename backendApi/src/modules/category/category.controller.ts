import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { HasPermissions } from '../auth/guards/permissions.decorator';
import { PermissionEnum } from '../auth/guards/enums/permission.enum';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { AppError } from 'src/common/constants/error';

@ApiTags('task-category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @ApiBearerAuth()
    @HasPermissions(PermissionEnum.CategoryCreate)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto, @Req() request) {
        return this.categoryService.create(createCategoryDto, request.user.user_id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('all')
    async findAll() {
        return this.categoryService.findAll();
    }

    @ApiBearerAuth()
    @HasPermissions(PermissionEnum.CategoryUpdate)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Patch()
    async update(@Body() updateCategoryDto: UpdateCategoryDto, @Req() request) {
        let foundCategory = null;
        if (updateCategoryDto.category_id) {
            foundCategory = await this.categoryService.findOne(updateCategoryDto.category_id);
        }
        if (!foundCategory) {
            throw new HttpException(AppError.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return this.categoryService.update(updateCategoryDto, request.user.user_id);
    }

    @ApiBearerAuth()
    @HasPermissions(PermissionEnum.CategoryDelete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Delete(':id')
    async remove(@Param('id') id: number, @Req() request) {
        const foundCategory = await this.categoryService.findOne(id);
        if (foundCategory == null) {
            throw new HttpException(AppError.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return this.categoryService.remove(+id, request.user.user_id);
    }
}
