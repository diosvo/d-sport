import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WomenComponent } from './women.component';
import { WmShoesComponent } from './wm-shoes/wm-shoes.component';
import { WmTopComponent } from './wm-top/wm-top.component';
import { WmBottomComponent } from './wm-bottom/wm-bottom.component';
import { WmShoesU100Component } from './wm-shoes-u100/wm-shoes-u100.component';
import { WmAccessoriesComponent } from './wm-accessories/wm-accessories.component';

const routes: Routes = [
  { path: '', component: WomenComponent, data: { title: 'Women\'s Shoes, Clothing & Accessories.' } },
  {
    path: 'women',
    children: [
      { path: '', redirectTo: 'women', pathMatch: 'full' },
      { path: 'shoes', component: WmShoesComponent, data: { title: 'Women\'s Shoes.' } },
      { path: 'top', component: WmTopComponent, data: { title: 'Women\'s Top.' } },
      { path: 'bottom', component: WmBottomComponent, data: { title: 'Women\'s Bottom.' } },
      { path: 'shoes-u100', component: WmShoesU100Component, data: { title: 'Women\'s Shoes Under 100.' } },
      { path: 'accessories', component: WmAccessoriesComponent, data: { title: 'Women\'s Accessories.' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WomenRoutingModule { }