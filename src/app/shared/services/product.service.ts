import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map, share, shareReplay} from 'rxjs/operators';
import {EMPTY, Observable, of} from "rxjs";
import {TtproductInterface} from "../types/ttproduct.interface";
import {API_URLS} from "./config";
import {CategoryInterface} from "../types/category.interface";
import {EditPageModel} from "../../modules/admin/models/editPageModel";
import {UserDescriptionInterface} from "../../modules/admin/shared/types/userDescription.interface";
import {OrderInterface} from "../types/order.interface";
import {OrderProductInterface} from "../../modules/admin/shared/types/orderProductInterface";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartProducts : TtproductInterface [] = [];

  constructor(
    private  http : HttpClient,
    private alert: AlertService
    ) { }

  getMenuItems(): Observable<any> {
    const url = environment.serverUrl + API_URLS.getMenuItems;
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        this.alert.danger(err);
        console.error(err);
        return EMPTY;
      })
    );
  }

  getProducts(): Observable<TtproductInterface[]> {
    const url = environment.serverUrl + API_URLS.getProducts;
    return this.http.get<any>(url);
  }

  getCategories(): Observable<CategoryInterface[]> {
    const url = environment.serverUrl + API_URLS.getCategories;
    return this.http.get<any>(url).pipe(
    );
  }

  getProductsByCategory(id: number): Observable<TtproductInterface[]> {
    const url = environment.serverUrl + API_URLS.getProductsByCategory;
    return this.http.post<any>(url, {id: id});
  }

  fetchUsersToModel(model: EditPageModel): Observable<EditPageModel> {
    const url = environment.serverUrl + API_URLS.getUserDescriptions;

    return this.http.get<any>(url).pipe(
      map((response:  UserDescriptionInterface[]) => {
        return model.saveUsersToModel(response);
      }),
      catchError((err: any) => {
        this.alert.danger(err);
        console.error(err);
        return of(model);
      })
    )
  }

  getOrderById(model: EditPageModel): Observable<EditPageModel> {
    return this.http.post(`${environment.serverUrl}/api/order_by_id`, {id: model.getOrderProduct().order_id}).pipe(
      map ( (response: OrderInterface) => {
        return model.saveOrderByIdToModel(response);
      }),
      catchError((err: any) => {
        this.alert.danger(err);
        console.error(err);
        return of(model);
      })
    )
  }

  getOrderProductByProductIdAndOrderId(model: EditPageModel): Observable<EditPageModel> {
    return this.http.post(`${environment.serverUrl}/api/order_product_by_id`, {id: model.productId, orderId: model.orderProductId}).pipe(
      map ( (response: OrderProductInterface) => {
        return model.saveOrderProductToModel(response);
    }),
      catchError((err: any) => {
        this.alert.danger(err);
        console.error(err);
        return of(model);
      })
    )
  }

  setStatusConfirm(id: number, orderIsConfirm: boolean): Observable<number> {
    return this.http.post<any>(`${environment.serverUrl}/api/change_order_status`, {id: id, status: orderIsConfirm? 1 : 0}).pipe(
      catchError((err: any) => {
        this.alert.danger('Возникла ошибка при смене статуса товара');
        console.error(err);
        return of(null);
      })
    )
  }

}
