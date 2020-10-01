import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/interceptor';

/* Layouts */
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NikeAthletesComponent } from './layouts/nike-athletes/nike-athletes.component';
import { PromotionsComponent } from './layouts/promotions/promotions.component';

/* Pages */
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

/* Classify Name */
import { MenComponent } from './pages/classify/men/men.component';
import { WomenComponent } from './pages/classify/women/women.component';
import { KidsComponent } from './pages/classify/kids/kids.component';
import { AccessoriesComponent } from './pages/classify/accessories/accessories.component';

/* for: Men */
import { MenShoesComponent } from './pages/classify/men/men-shoes/men-shoes.component';
import { MenTopComponent } from './pages/classify/men/men-top/men-top.component';
import { MenBottomComponent } from './pages/classify/men/men-bottom/men-bottom.component';
import { MenAccessoriesComponent } from './pages/classify/men/men-accessories/men-accessories.component';

/* for: Women */
import { WmShoesComponent } from './pages/classify/women/wm-shoes/wm-shoes.component';
import { WmTopComponent } from './pages/classify/women/wm-top/wm-top.component';
import { WmBottomComponent } from './pages/classify/women/wm-bottom/wm-bottom.component';
import { WmShoesU100Component } from './pages/classify/women/wm-shoes-u100/wm-shoes-u100.component';
import { WmAccessoriesComponent } from './pages/classify/women/wm-accessories/wm-accessories.component';

/* for: Kids */
import { KAccessoriesComponent } from './pages/classify/kids/k-accessories/k-accessories.component';
import { KTopComponent } from './pages/classify/kids/k-top/k-top.component';
import { KBottomComponent } from './pages/classify/kids/k-bottom/k-bottom.component';
import { KShoesComponent } from './pages/classify/kids/k-shoes/k-shoes.component';

const config: SocketIoConfig = { url: 'http://localhost:2609', options: {} };

@NgModule({
  declarations: [
    AppComponent,

    // Layout
    HeaderComponent,
    FooterComponent,
    NikeAthletesComponent,
    PromotionsComponent,

    // Components
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    AboutusComponent,

    // User functions
    LoginComponent,
    ProfileComponent,
    RegisterComponent,

    // All Classify
    MenComponent,
    WomenComponent,
    KidsComponent,
    AccessoriesComponent,

    // Men
    MenShoesComponent,
    MenTopComponent,
    MenBottomComponent,
    MenAccessoriesComponent,

    // Women
    WmShoesComponent,
    WmTopComponent,
    WmBottomComponent,
    WmShoesU100Component,
    WmAccessoriesComponent,

    // Kids
    KAccessoriesComponent,
    KTopComponent,
    KBottomComponent,
    KShoesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    CarouselModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {
}
