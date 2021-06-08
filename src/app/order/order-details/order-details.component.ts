import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;
  orderItems: IOrderItem[];

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private bc: BreadcrumbService) {
      this.bc.set('@orderDetailed', '')
     }

  ngOnInit(): void {
    this.loadOrder()
  }

  async loadOrder() {
    const order = this.orderService.getOrderById(+this.activatedRoute.snapshot.paramMap.get('id')).toPromise()
    this.order = await order;
    this.orderItems = (await order).orderItems;
    this.bc.set('@orderDetailed', `Order# ${this.order.id} : ${this.order.status}`);
  }
}
