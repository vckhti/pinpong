import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { ProductPageComponent } from './shared/components/product-page/product-page.component';
import { CartPageComponent } from './shared/components/cart-page/cart-page.component';
import {CategoryPageComponent} from "./shared/components/category-page/category-page.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'main', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'category/:slug', component: CategoryPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
