import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandsDetailsComponent } from './components/brands-details/brands-details.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'forgot', component: ForgotpasswordComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'product',
        loadComponent: () =>
          import('./components/product/product.component').then(
            (c) => c.ProductComponent
          ),
      }, //lazy loading
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'orders/:id', component: OrdersComponent },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import(
            './components/category-details/category-details.component'
          ).then((c) => c.CategoryDetailsComponent),
      },
      { path: 'brands/:id', component: BrandsDetailsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
