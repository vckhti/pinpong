import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from 'src/app/shared/services/product.service';
import {switchMap} from 'rxjs/operators';
import {UntypedFormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from "rxjs";
import {EditPageModel} from "../models/editPageModel";
import {OrderProductInterface} from "../shared/types/orderProductInterface";
import {OrderInterface} from "../../shared/types/order.interface";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  model: EditPageModel;
  form: UntypedFormGroup;
  order: OrderInterface;
  isLoading = true;
  orderProduct: OrderProductInterface;
  submitted = false;

  private subscriptions: Subscription;
  private listInitializer: BehaviorSubject<EditPageModel>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.model = new EditPageModel();
    this.listInitializer = new BehaviorSubject(this.model);
    this.subscriptions = new Subscription()
  }

  ngOnInit() {
    this.subscriptions.add(
      this.listInitializer.pipe(
        switchMap((model: EditPageModel) => this.route.params),
        switchMap((params: Params) => this.model.saveProductIdToModel(params['id'])),
        switchMap((model: EditPageModel) => this.route.queryParams),
        switchMap((params: Params) => this.model.saveOrderIdToModel(params['orderId'])),
        switchMap((model: EditPageModel) => this.productService.getOrderProductByProductIdAndOrderId(model)),
        switchMap((model: EditPageModel) => this.productService.getOrderById(model)),
        switchMap((model: EditPageModel) => this.productService.fetchUsersToModel(model)),
      )
        .subscribe((model: EditPageModel) => {
          this.orderProduct = model.getOrderProduct();
          this.order = model.getOrder();
          this.isLoading = false;
        })
    );
  }


  goBack() {
    window.history.back();
  }

  setStatusConfirm(orderProductId: number) {
    this.subscriptions.add(
      this.productService.setStatusConfirm(orderProductId, true).subscribe(
        (response: number) => {
          this.orderProduct.complete = response;
        }
      )
    );
  }

  setStatusNotConfirm(orderProductId: number) {
    this.subscriptions.add(
      this.productService.setStatusConfirm(orderProductId, false).subscribe(
        (response: number) => {
          this.orderProduct.complete = response;
        }
      )
    );
  }


}
