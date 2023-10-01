import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {ProductService} from "../../services/product.service";
import {delayWhen, interval, of, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";
import {selectIsLoadingSelector} from "../../../core/store/app-selectors";

@Component({
  selector: 'app-topbar-mobile',
  templateUrl: './topbar-mobile.component.html',
  styleUrls: ['./topbar-mobile.component.scss']
})
export class TopbarMobileComponent implements OnInit, OnDestroy {
  @Output() itemClick = new EventEmitter();

  categories: CategoryInterface[] | undefined = [];
  private subscriptions: Subscription;
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private store: Store
  ) {
    this.subscriptions = new Subscription();
  }


  getChildrens(category: any): any[] {
    return Object.values(category.children);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {

  }

  onCategorySelect() {
    //TODO Убрать костыль.(Нужен для редких ситуаций).
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 5000);
  }

  getOnlyParentCategories(): any {
    return this.categories?.filter((item) => item.parent_id === 0 );
  }

}
