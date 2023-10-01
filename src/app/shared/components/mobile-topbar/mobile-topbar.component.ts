import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {delayWhen, interval, of, Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {Store} from "@ngrx/store";
import {selectIsLoadingSelector} from "../../../core/store/app-selectors";
import {setLoadingIndicator} from "../../../core/store/app-actions";
import {PopupService} from "../../services/popup.service";

@Component({
  selector: 'app-mobile-topbar',
  templateUrl: './mobile-topbar.component.html',
  styleUrls: ['./mobile-topbar.component.scss']
})
export class MobileTopbarComponent implements OnInit, OnDestroy{
  @Output() itemClick = new EventEmitter();
  @Input() sidebarVisible;

  categories: CategoryInterface[] = [];
  private subscriptions: Subscription;
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private popupService: PopupService,
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
    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector: any) => {
          if (selectIsLoadingSelector) {
            this.isLoading = selectIsLoadingSelector;
          } else {
            this.isLoading = selectIsLoadingSelector;
          }
        }
      )
    );

    this.subscriptions.add(
      this.productService.getCategories().subscribe(
        (response: any) => {
          this.categories = response;
        }
      )
    );

  }

  getOnlyNoChildrensCategories(): any {
    return this.categories?.filter((item) => item.category_id !== 9 );
  }
  onCategorySelect() {
    //TODO Убрать костыль.(Нужен для редких ситуаций).
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 5000);

    this.popupService.close();
  }

}
