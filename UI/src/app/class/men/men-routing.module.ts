import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenComponent } from './men.component';
import { MenShoesComponent } from './men-shoes/men-shoes.component';
import { MenTopComponent } from './men-top/men-top.component';
import { MenBottomComponent } from './men-bottom/men-bottom.component';
import { MenAccessoriesComponent } from './men-accessories/men-accessories.component';

const routes: Routes = [
  { path: '', component: MenComponent, data: { title: 'Men\'s Shoes, Clothing & Accessories.' } },
  {
    path: 'men',
    children: [
      { path: '', redirectTo: 'men', pathMatch: 'full' },
      { path: 'shoes', component: MenShoesComponent, data: { title: 'Men\'s Shoes.' } },
      { path: 'top', component: MenTopComponent, data: { title: 'Men\'s Top.' } },
      { path: 'bottom', component: MenBottomComponent, data: { title: 'Men\'s Bottom.' } },
      { path: 'accessories', component: MenAccessoriesComponent, data: { title: 'Men\'s Accessories.' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenRoutingModule { }