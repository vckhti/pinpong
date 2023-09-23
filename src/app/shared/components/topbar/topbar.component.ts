import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {Menu} from "../../types/menu.interface";
import {ProductService} from "../../services/product.service";
import {delayWhen, distinctUntilChanged, interval, of, Subscription} from "rxjs";
import {ScreenService} from "../../services/screen.service";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";
import {selectIsLoadingSelector} from "../../../core/store/app-selectors";

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
      this.screenService.getScreenWidth().pipe(
        distinctUntilChanged()
      ).subscribe(
        (width: number) => {
          this.screenWidth = width;
        }
      )
    );

    this.subscriptions.add(
      this.productService.getMenuItems().subscribe(
        (response: any) => {
          this.categories = Object.values(response).filter((item: Menu) => item.language_id === 2);
        }
      )
    );
  }

  setLoadingIndicator() {
    //TODO Убрать костыль.(Нужен для редких ситуаций).
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 5000);
  }

  onHamburgerClick(): void {
    this.itemClick.next(true);
  }

}
