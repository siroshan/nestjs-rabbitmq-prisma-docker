import { PrismaService } from '@app/common';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { BILLING_SERVICE } from './constants/service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  private readonly logger = new Logger(OrdersService.name);

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const order = tx.order.create({
          data: createOrderDto,
        });
        await lastValueFrom(
          this.billingClient.emit('order_created', {
            createOrderDto,
          }),
        );
        return order;
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
