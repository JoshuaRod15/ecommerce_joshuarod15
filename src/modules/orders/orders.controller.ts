/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/dtos/CreateOrder.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){};

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        return this.ordersService.addOrder(order);
    }
    
    @ApiBearerAuth()
    @Get('orderdetail/:id')
    @UseGuards(AuthGuard)
    getOrderById(@Param('id', ParseUUIDPipe) id:string){
        return this.ordersService.getOrderById(id)
    }


}
