import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {ProductService} from "../../services/product.service";
import {delayWhen, interval, of, Subscription} from "rxjs";
import {ScreenService} from "../../services/screen.service";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";
import {categoriesArraySelector, selectIsLoadingSelector} from "../../../core/store/app-selectors";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Output() itemClick = new EventEmitter();
  categories: CategoryInterface[] = [];
  isLoading: boolean;

  private subscriptions: Subscription;

  constructor(
    private productService: ProductService,
    private screenService: ScreenService,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.initCategoriesArraySelectorObserver();
    this.initSelectIsLoadingSelectorObserver();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initCategoriesArraySelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(categoriesArraySelector).pipe(
        filter(res => res !== undefined),
      ).subscribe(
        (categories: CategoryInterface[]) => {
          for (let i = 0; categories && i < categories.length; i++) {
            categories[i].children = new Array();
            for (let j = 0; j < categories.length; j++) {
              if (categories[i].category_id == categories[j].parent_id) {
                categories[i].children.push(categories[j]);
              }
            }
            if (categories[i].category_id === 0) {
              this.categories.push(categories[i]);
            }
          }
          this.categories = categories;
          this.cdr.detectChanges();
        }
      )
    );
  }

  private initSelectIsLoadingSelectorObserver(): void {
    this.subscriptions.add(
      this.store.select(selectIsLoadingSelector).pipe(
        delayWhen(IsLoading => !IsLoading ? interval(1500) : of(true))
      ).subscribe(
        (selectIsLoadingSelector) => {
          this.isLoading = selectIsLoadingSelector;
          this.cdr.detectChanges();
        }
      )
    );
  }

  public getOnlyParentCategories(): CategoryInterface[] {
    return this.categories?.filter((item) => item.parent_id === 0);
  }



}
