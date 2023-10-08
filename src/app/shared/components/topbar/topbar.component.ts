import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {ProductService} from "../../services/product.service";
import {delayWhen, distinctUntilChanged, interval, of, Subscription, take} from "rxjs";
import {ScreenService} from "../../services/screen.service";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";
import {selectIsLoadingSelector} from "../../../core/store/app-selectors";
import {fetchCategoriesSuccess} from "../../../core/store/app-actions";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Output() itemClick = new EventEmitter();

  categories: CategoryInterface[] = [];
  private subscriptions: Subscription;
  screenWidth: number;
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private screenService: ScreenService,
    private store: Store
  ) {
    this.subscriptions = new Subscription();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.getCategories().pipe(
        take(1)
      ).subscribe(
        (tempCategory: CategoryInterface[]) => {
          for (let i = 0; i < tempCategory.length; i++) {
            tempCategory[i].children = new Array();
            for (let j = 0; j < tempCategory.length; j++) {

              if (tempCategory[i].category_id == tempCategory[j].parent_id) {
                tempCategory[i].children.push(tempCategory[j]);
              }
            }
            if (tempCategory[i].category_id === 0) {
              this.categories.push(tempCategory[i]);
            }
          }
          this.categories = tempCategory;
          this.store.dispatch(new fetchCategoriesSuccess({categories: tempCategory}));
        }
      )
    );

    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector) => {
          this.isLoading = selectIsLoadingSelector;
        }
      )
    );
  }

  getOnlyParentCategories(): any {
    return this.categories?.filter((item) => item.parent_id === 0 );
  }

  setLoadingIndicator() {
    //TODO Убрать костыль.(Нужен для редких ситуаций).
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 5000);
  }



}
