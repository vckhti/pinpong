import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../types/category.interface";
import {Menu} from "../../types/menu.interface";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {setLoadingIndicator} from "../../../core/store/app-actions";

@Component({
  selector: 'app-topbar-mobile',
  templateUrl: './topbar-mobile.component.html',
  styleUrls: ['./topbar-mobile.component.scss']
})
export class TopbarMobileComponent implements OnInit, OnDestroy {
  @Output() itemClick = new EventEmitter();

  categories: CategoryInterface[] = [];
  subscriptions: Subscription;

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

    this.subscriptions.add(
      this.productService.getMenuItems().subscribe(
        (response: any) => {
          this.categories = Object.values(response).filter((item: Menu) => item.language_id === 2);
        }
      )
    );
  }

  onCategorySelect() {
    this.store.dispatch(new setLoadingIndicator({loading: true}));
    setTimeout(() => this.store.dispatch(new setLoadingIndicator({loading: false})), 1500);
  }

}
