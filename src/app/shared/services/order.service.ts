import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, Observable, of} from "rxjs";
import {OrderModel} from "../../modules/admin/models/orderModel";
import {API_URLS} from "./config";
import {OrderProductInterface} from "../../modules/admin/shared/types/orderProductInterface";
import {OrderRequestInteface} from "../types/order-request.inteface";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private  http : HttpClient,
    private alert: AlertService
  ) { }

  create(order: OrderRequestInteface) {
    const url = environment.serverUrl + API_URLS.getCreateOrder;
    return this.http.post(url, order).pipe(
      catchError((err) => {
        this.alert.danger(err ?? 'Сервеная ошибка');
        console.error(err);
        return EMPTY;
      })
    );
  }

  getOrders(): Observable<OrderProductInterface[]> {
    return this.http.get<OrderProductInterface[]>(`${environment.serverUrl}/api/orders`).pipe(
      catchError((err) => {
        this.alert.danger(err ?? 'Сервеная ошибка');
        console.error(err);
        return EMPTY;
      })
    );
  }

  fetchProductsToModel(model: OrderModel): Observable<OrderModel> {
    const url = environment.serverUrl + API_URLS.getProducts;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return model.saveProductsToModel(response);
      }),
      catchError((err: any) => {
        this.alert.danger(err ?? 'Сервеная ошибка');
        console.error(err);
        return of(model);
      })
    )
  }

  fetchUsersToModel(model: OrderModel): Observable<OrderModel> {
    const url = environment.serverUrl + API_URLS.getUserDescriptions;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return model.saveUsersToModel(response);
      }),
      catchError((err: any) => {
        this.alert.danger(err ?? 'Сервеная ошибка');
        console.error(err);
        return of(model);
      })
    )
  }


}
