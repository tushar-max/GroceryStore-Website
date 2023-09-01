import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AddGroceryComponent } from './MyComponents/add-grocery/add-grocery.component';
import { CartComponent } from './MyComponents/cart/cart.component';
import { ProductDetailComponent } from './MyComponents/product-detail/product-detail.component';
import { FruitsComponent } from './MyComponents/Categories/fruits/fruits.component';
import { CheckoutComponent } from './MyComponents/checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './MyComponents/Authentication/login/login.component';
import { RegisterComponent } from './MyComponents/Authentication/register/register.component';
import { Log } from 'oidc-client';
import { JwtModule } from '@auth0/angular-jwt';
import { PlacedOrdersComponent } from './MyComponents/placed-orders/placed-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AddGroceryComponent,
    CartComponent,
    ProductDetailComponent,
    FruitsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    PlacedOrdersComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:4200'],
      },
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'products', component: FetchDataComponent },
      { path: 'addProduct', component: AddGroceryComponent},
      { path: 'cart', component:CartComponent},
      { path:'product-detail', component:ProductDetailComponent},
      { path:'checkout', component:CheckoutComponent},
      { path:'login', component:LoginComponent},
      { path:'register', component:RegisterComponent},
      { path:'orders', component:PlacedOrdersComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
