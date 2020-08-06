import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Pages */
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { ProfileComponent } from './pages/profile/profile.component';

/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

/* By Classify Name */
import { NewReleasesComponent } from './pages/classify/new-releases/new-releases.component';
import { MenComponent } from './pages/classify/men/men.component';
import { WomenComponent } from './pages/classify/women/women.component';
import { KidsComponent } from './pages/classify/kids/kids.component';
import { AccessoriesComponent } from './pages/classify/accessories/accessories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  /* Pages */
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'profile', component: ProfileComponent },

  /* Components */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* By Classify Name */
  { path: 'new-releases', component: NewReleasesComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'accessories', component: AccessoriesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
