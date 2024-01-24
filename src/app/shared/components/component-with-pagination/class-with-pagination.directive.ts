import {ChangeDetectorRef, Directive, inject} from '@angular/core';
import {Router} from "@angular/router";
import {TtproductInterface} from "../../types/ttproduct.interface";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SortConfigInterface} from "../../types/sort-config.interface";
import {addProductToBasket} from "../../../core/store/app-actions";
import {Store} from "@ngrx/store";
import {AlertService} from "../../services/alert.service";

@Directive({
  selector: '[base]'
})
export class ClassWithPagination {
  protected tableData: TtproductInterface[] = [];
  protected currentPage: number;
  protected tempArray: TtproductInterface[] = [];
  protected limit: number;
  protected totalArrayLengthForPagination: number;
  protected baseUrl: string;
  protected isLoading: boolean;
  private _sortConfig: SortConfigInterface;

  protected filterString='';
  protected router = inject(Router);
  protected store = inject(Store);
  protected alertService = inject(AlertService);
  protected cdr = inject(ChangeDetectorRef);

  public productsInBasket: TtproductInterface[] = [];

  constructor() {
    this.isLoading = true;
    this.currentPage = 1;
    this.limit = 6;
    this._sortConfig = { asc: false, column: 'id' } as SortConfigInterface;
  }

  protected setPaginationToFirstPageAndPaginate(): void  {
    if (this.filterString.length > 0) {
      this.currentPage = 1;
    }

    this.paginate();
  }

  protected paginate(pageSize?: number | undefined): void {
    let lastLimit = pageSize ? pageSize : null;
    this.tempArray = [];
    if (this.tableData && this.tableData.length > 0) {
      this.totalArrayLengthForPagination = this.tableData.length;
      for (let i = 0; i < (this.limit * this.currentPage); i++) {
        if (this.tableData[i]) {
          this.tempArray.push(this.tableData[i]);
        }
      }
    }

    this.tempArray.splice(0, this.limit * (this.currentPage - 1));
    if (this.totalArrayLengthForPagination < this.limit) {
      this.currentPage = 1;
      if (this.baseUrl && this.baseUrl.length > 0 ) {
        this.router.navigate([this.baseUrl]);
      }
    }
    if (pageSize && pageSize != this.limit) {
      this.currentPage = 1;

      if (lastLimit) {
        this.limit = lastLimit;
      }
      this.handleCurrentPage(this.currentPage.toString());
      if (this.baseUrl && this.baseUrl.length > 0 ) {
        this.router.navigate([this.baseUrl]);
      }
    }
  }

  protected handleCurrentPage(event: string): void {
    this.currentPage = parseInt(event);
    this.paginate();
  }

  unique(array: string[]): string[] {
    let result =  array.reduce((acc: string[], item: string) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
    return result;
  }

  protected keyupAsValue(elem: any): Observable<any> {
    return fromEvent(elem, 'keyup').pipe(
      map((event: any) => event.target.value),
    );
  };

  public onDoSort(sortParams: any): void {
    switch (sortParams.value) {
      case 'price_asc': {
        this._sortConfig = {asc: true, column: 'price'};
        this.sortProductsByPrice(this._sortConfig.asc);
        break;
      }
      case 'price_desc': {
        this._sortConfig = {asc: false, column: 'price'};
        this.sortProductsByPrice(this._sortConfig.asc);
        break;
      }
      case 'title_asc': {
        this._sortConfig = {asc: true, column: 'title'};
        this.sortProductsByTitle(this._sortConfig.asc);
        break;
      }
      case 'title_desc': {
        this._sortConfig = {asc: false, column: 'title'};
        this.sortProductsByTitle(this._sortConfig.asc);
        break;
      }
      default: {
        break;
      }
    }
  }

  public sortProductsByPrice(asc: boolean = true): void {
    this.tableData = this.tableData.sort((a: TtproductInterface, b: TtproductInterface) => {
      if (a.price > b.price) {
        return asc ? 1 : -1;
      } else if (a.price < b.price) {
        return asc ? -1 : 1;
      }
      return 0;
    });
    this.paginate();
  }

  public sortProductsByTitle(asc: boolean = true): void {
    this.tableData = this.tableData.sort((a: TtproductInterface, b: TtproductInterface) => {
      if (a.title > b.title) {
        return asc ? 1 : -1;
      } else if (a.title < b.title) {
        return asc ? -1 : 1;
      }
      return 0;
    });
    this.paginate()
  }

  public onAddItemToCart(product: TtproductInterface): void {
    this.store.dispatch(new addProductToBasket({product: product}));
    this.alertService.success(`${product.title} успешно добавлен в корзину!`);
  }


  public productAlreadyInCart(product: TtproductInterface): boolean {
    if (this.productsInBasket && this.productsInBasket.length > 0) {
      for (let i = 0; i < this.productsInBasket.length; i++) {
        if (this.productsInBasket[i].id === product.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

}
