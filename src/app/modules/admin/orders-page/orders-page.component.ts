import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'src/app/shared/services/order.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {OrderModel} from "../models/orderModel";
import {switchMap} from "rxjs/operators";
import {OrderProductInterface} from "../shared/types/orderProductInterface";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  model: OrderModel;
  allOrdersProduct: OrderProductInterface[] = [];
  isLoading = true;

  private subscriptions: Subscription;
  private listInitializer: BehaviorSubject<OrderModel>;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {
    this.model = new OrderModel();
    this.subscriptions = new Subscription();
    this.listInitializer = new BehaviorSubject(this.model);
  }

  private initAllOrdersProductObserver(): void {
    this.subscriptions.add(
      this.orderService.getOrders().subscribe((orders: OrderProductInterface[]) => {
        this.allOrdersProduct = orders;
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    );
  }

  private initOrderModelObserver(): void {
    this.subscriptions.add(
      this.listInitializer.pipe(
        switchMap((model: OrderModel) => this.orderService.fetchProductsToModel(model)),
        switchMap((model: OrderModel) => this.orderService.fetchUsersToModel(model)))
        .subscribe(() => {
          this.cdr.detectChanges();
        })
    );
  }

  ngOnInit() {
    this.initOrderModelObserver();
    this.initAllOrdersProductObserver();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
