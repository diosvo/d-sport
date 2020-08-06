import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Layouts */
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

/* Pages */
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { ProfileComponent } from './pages/profile/profile.component';



/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

/* Classify Name */
import { MenComponent } from './pages/classify/men/men.component';
import { WomenComponent } from './pages/classify/women/women.component';
import { KidsComponent } from './pages/classify/kids/kids.component';
import { NewReleasesComponent } from './pages/classify/new-releases/new-releases.component';
import { AccessoriesComponent } from './pages/classify/accessories/accessories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MenComponent,
    WomenComponent,
    KidsComponent,
    NewReleasesComponent,
    AccessoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
