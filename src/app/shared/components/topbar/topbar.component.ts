import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {Menu} from "../../types/menu.interface";
import {ProductService} from "../../services/product.service";
import {distinctUntilChanged, Subscription} from "rxjs";
import {ScreenService} from "../../services/screen.service";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";

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
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 1500);
  }

  onHamburgerClick(): void {
    this.itemClick.next(true);
  }

}
