import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  findAll() {
    return this.ordersService.findAll();
  }

  // @Get(':id')
  // @ApiCreatedResponse({ type: OrderEntity, isArray: true })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.ordersService.findOne(id);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: OrderEntity })
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.ordersService.remove(id);
  // }
}
