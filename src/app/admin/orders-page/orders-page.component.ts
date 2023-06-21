import {Component, OnDestroy, OnInit} from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {OrderModel} from "../models/orderModel";
import {switchMap} from "rxjs/operators";
import {OrderProductInterface} from "../shared/types/orderProductInterface";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  model: OrderModel;
  allOrdersProduct: OrderProductInterface[] = [];
  isLoading = true;
  private subscriptions: Subscription;
  private listInitializer: BehaviorSubject<OrderModel>;

  constructor(
    private orderService: OrderService
  ) {
    this.model = new OrderModel();
    this.subscriptions = new Subscription();
    this.listInitializer = new BehaviorSubject(this.model);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.orderService.getOrders().subscribe( (orders: OrderProductInterface[]) => {
      this.allOrdersProduct = orders;
      this.isLoading = false;
    })
    );

    this.subscriptions.add(
      this.listInitializer.pipe(
        switchMap((model: OrderModel) => this.orderService.fetchProductsToModel(model)),
        switchMap((model: OrderModel) => this.orderService.fetchUsersToModel(model)))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
