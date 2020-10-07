import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

import { KidsRoutingModule } from './kids-routing.module';
import { KidsComponent } from './kids.component';
import { KShoesComponent } from './k-shoes/k-shoes.component';
import { KTopComponent } from './k-top/k-top.component';
import { KBottomComponent } from './k-bottom/k-bottom.component';
import { KAccessoriesComponent } from './k-accessories/k-accessories.component';

@NgModule({
  declarations: [KidsComponent, KShoesComponent, KTopComponent, KBottomComponent, KAccessoriesComponent],
  imports: [
    CommonModule,
    KidsRoutingModule,
    FormsModule,
    CarouselModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [KidsComponent]
})
export class KidsModule { }
