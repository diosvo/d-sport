import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';


@NgModule({
  declarations: [AdminComponent, AdminProductComponent, AdminOrderComponent, AdminUserComponent, AdminStatisticComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    CarouselModule,
    NgxPaginationModule,
    SharedModule,
  ],
  exports: [AdminComponent],
})

export class AdminModule { }