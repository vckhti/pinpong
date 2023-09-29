import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment.prod";
import {reducers} from "./core/store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./core/store/app-effects";
import { CategoryPageComponent } from './components/category-page/category-page/category-page.component';
import {UiUtilsModule} from "./shared/modules/ui-utils/ui-utils.module";
import {AlertComponent} from "./shared/components/alert/alert.component";
import {AlertService} from "./shared/services/alert.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {
  ComponentWithPaginationComponent
} from "./shared/components/component-with-pagination/component-with-pagination.component";
import {PaginationModule} from "./shared/modules/pagination/pagination.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthModule} from "./modules/auth/auth.module";
import {PersistanceService} from "./admin/services/persistance.service";
import {GlobalErrorHandlerService} from "./shared/services/globalErrorHandler.service";
import {SidebarModule} from "primeng/sidebar";
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import {TopbarMobileComponent} from "./shared/components/topbar-mobile/topbar-mobile.component";
import {ScreenService} from "./shared/services/screen.service";
import {LoadingModule} from "./shared/modules/loading/loading.module";
import { MobileTopbarComponent } from './shared/components/mobile-topbar/mobile-topbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {MenuItemComponent} from "./shared/components/menu-item/menu-item.component";
import {PopupMenuComponent} from "./shared/components/popup-menu/popup-menu.component";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AlertComponent,
    MainPageComponent,
    TopbarComponent,
    TopbarMobileComponent,
    ProductPageComponent,
    CartPageComponent,
    CategoryPageComponent,
    ComponentWithPaginationComponent,
    MobileTopbarComponent,
    HeaderComponent,
    MenuItemComponent,
    PopupMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    PaginationModule,
    SidebarModule,
    ConfirmDialogModule,
    UiUtilsModule,
    LoadingModule,
    HttpClientModule,
    StoreModule.forRoot({app: reducers}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production
    }),
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: AuthInterceptor
    // },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AlertService,
    ScreenService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    ConfirmationService,
    MessageService,
    DialogService,
    PersistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
