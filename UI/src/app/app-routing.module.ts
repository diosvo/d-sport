import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/page-404/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about.d', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'thankyou', loadChildren: () => import('./pages/thankyou/thankyou.module').then(m => m.ThankyouModule) },
  { path: 'product-details/:id', loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  // { path: '**', component: NotFoundComponent},

  { path: 'men', loadChildren: () => import('./class/men/men.module').then(m => m.MenModule) },
  { path: 'women', loadChildren: () => import('./class/women/women.module').then(m => m.WomenModule) },
  { path: 'kids', loadChildren: () => import('./class/kids/kids.module').then(m => m.KidsModule) },
  { path: 'accessories', loadChildren: () => import('./class/accessories/accessories.module').then(m => m.AccessoriesModule) },

  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }