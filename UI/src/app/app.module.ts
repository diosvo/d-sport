import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { Page404Module } from './pages/page-404/page-404.module';

import { HomeModule } from './pages/home/home.module';
import { AboutUsModule } from './pages/about-us/about-us.module';
import { ThankyouModule } from './pages/thankyou/thankyou.module';
import { ProductDetailsModule } from './pages/product-details/product-details.module';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { CartModule } from './pages/cart/cart.module';
import { ProfileModule } from './pages/profile/profile.module';
import { AdminModule } from './pages/admin/admin.module';

import { MenModule } from './class/men/men.module';
import { WomenModule } from './class/women/women.module';
import { KidsModule } from './class/kids/kids.module';
import { AccessoriesModule } from './class/accessories/accessories.module';

import { ErrorInterceptor } from './interceptor/error.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
    AuthModule,
    Page404Module,

    HomeModule,
    AboutUsModule,
    ProductDetailsModule,
    CartModule,
    ThankyouModule,
    CheckoutModule,
    ProfileModule,

    MenModule,
    WomenModule,
    KidsModule,
    AccessoriesModule,

    AdminModule,

    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }