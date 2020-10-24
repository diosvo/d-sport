import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout.component';
import { ProfileGuard } from 'src/app/guard/profile.guard';

const routes: Routes = [{ path: '', component: CheckoutComponent, data: { title: 'Checkout.' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CheckoutRoutingModule { }