/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { authGuard } from "../Auth/authGuard.guard";
import { AuthGuard } from "../../guards/auth.guard";
import { Role } from "../../role.enum";
import { Roles } from "../../decorators/roles.decorator";
import { RolesGuard } from "../../guards/roles.guard";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "src/dtos/CreateProduct.dto";
//import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags('Products')
@Controller('products')
export class ProductsController{
    constructor(
        private readonly productsService: ProductsService,
    ){}
    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: 'Limit number of items', type: Number })
    getProducts(@Query('page') page:number=1, @Query('limit') limit:number=5){
        return this.productsService.getProducts(page,limit)
    }

    @ApiBearerAuth()
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    createProduct(@Body() product:CreateProductDto){
        return this.productsService.createProduct(product)
    }

    @Get('seeder')
    gerSeederProducts(){
        return this.productsService.getSeederProducts()
    }

    @Post('seeder')
    addSeederProducts(){
        return this.productsService.addSeederProduct();
    }

    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id:string){
        return this.productsService.getProductById(id)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id, @Body() updates: CreateProductDto){
        return this.productsService.updateProduct(id, updates)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(authGuard, RolesGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id:string){
        return this.productsService.deleteProduct(Number(id))
    }
}