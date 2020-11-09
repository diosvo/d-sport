import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, data: { title: 'Admin' } },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      {
        path: 'product',
        component: AdminProductComponent,
        data: { title: 'Admin Product.' },
      },
      {
        path: 'order',
        component: AdminOrderComponent,
        data: { title: 'Admin Order.' },
      },
      {
        path: 'user',
        component: AdminUserComponent,
        data: { title: 'Admin User.' },
      },
      {
        path: 'statistic',
        component: AdminStatisticComponent,
        data: { title: 'Admin Statistic.' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
