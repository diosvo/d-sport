import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { WomenRoutingModule } from './women-routing.module';
import { WomenComponent } from './women.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

import { WmAccessoriesComponent } from './wm-accessories/wm-accessories.component';
import { WmTopComponent } from './wm-top/wm-top.component';
import { WmBottomComponent } from './wm-bottom/wm-bottom.component';
import { WmShoesComponent } from './wm-shoes/wm-shoes.component';
import { WmShoesU100Component } from './wm-shoes-u100/wm-shoes-u100.component';

@NgModule({
  declarations: [WomenComponent, WmAccessoriesComponent, WmTopComponent, WmBottomComponent, WmShoesComponent, WmShoesU100Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    WomenRoutingModule,
    CarouselModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [WomenComponent]
})

export class WomenModule { }