import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NikeAthletesComponent } from './layouts/nike-athletes/nike-athletes.component';
import { PromotionsComponent } from './layouts/promotions/promotions.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    NikeAthletesComponent,
    PromotionsComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NikeAthletesComponent,
    PromotionsComponent,
    SidebarComponent,
  ],
})
export class SharedModule { }
