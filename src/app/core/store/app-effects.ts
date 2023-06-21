import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../../shared/services/product.service";
import {Store} from "@ngrx/store";
import {catchError, map, switchMap} from "rxjs/operators";
import {ActionTypes} from "./app-actionTypes";
import {TtproductInterface} from "../../shared/types/ttproduct.interface";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  fetchProductsFailure,
  fetchProductsSuccess
} from "./app-actions";
import {CategoryInterface} from "../../shared/types/category.interface";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store,
  ) {
  }

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_PRODUCTS_START),
      switchMap((v) => {
        return this.productService.getProducts().pipe(
          map((response: TtproductInterface[]) => {
            return new fetchProductsSuccess({products: response})
          })
        )
      }),
      catchError((errorResponse: any, caught) => {
        this.store.dispatch(new fetchProductsFailure({err: errorResponse.error.error}));
        return caught;
      })
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_CATEGORIES_START),
      switchMap((v) => {
        return this.productService.getCategories().pipe(
          map((response: CategoryInterface[]) => {
            return new fetchCategoriesSuccess({categories: response})
          })
        )
      }),
      catchError((errorResponse: any, caught) => {
        this.store.dispatch(new fetchCategoriesFailure({err: errorResponse.error.error}));
        return caught;
      })
    )
  );

  fetchProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FETCH_PRODUCTS_BY_CATEGORY),
      switchMap((v: any) => {
        return this.productService.getProductsByCategory(v.payload.id).pipe(
          map((response: TtproductInterface[]) => {
            return new fetchProductsSuccess({products: response})
          })
        )
      }),
      catchError((errorResponse: any, caught) => {
        this.store.dispatch(new fetchProductsFailure({err: errorResponse.error.error}));
        return caught;
      })
    )
  );

}
