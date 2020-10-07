import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NikeAthletesComponent } from './layouts/nike-athletes/nike-athletes.component';
import { PromotionsComponent } from './layouts/promotions/promotions.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    NikeAthletesComponent,
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NikeAthletesComponent,
    PromotionsComponent
  ],
})
export class SharedModule { }
