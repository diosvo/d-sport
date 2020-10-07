import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeComponent } from './home.component';
import { NikeAthletesComponent } from 'src/app/shared/layouts/nike-athletes/nike-athletes.component';
import { PromotionsComponent } from 'src/app/shared/layouts/promotions/promotions.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    SharedModule
  ],
  exports: [HomeComponent],
})

export class HomeModule { }