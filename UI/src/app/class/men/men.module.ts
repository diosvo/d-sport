import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

import { MenRoutingModule } from './men-routing.module';
import { MenComponent } from './men.component';
import { MenShoesComponent } from './men-shoes/men-shoes.component';
import { MenTopComponent } from './men-top/men-top.component';
import { MenBottomComponent } from './men-bottom/men-bottom.component';
import { MenAccessoriesComponent } from './men-accessories/men-accessories.component';


@NgModule({
  declarations: [MenComponent, MenShoesComponent, MenTopComponent, MenBottomComponent, MenAccessoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MenRoutingModule,
    CarouselModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [MenComponent],
})

export class MenModule { }