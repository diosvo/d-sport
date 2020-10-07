import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WomenComponent } from './women.component';
import { WmShoesComponent } from './wm-shoes/wm-shoes.component';
import { WmTopComponent } from './wm-top/wm-top.component';
import { WmBottomComponent } from './wm-bottom/wm-bottom.component';
import { WmShoesU100Component } from './wm-shoes-u100/wm-shoes-u100.component';
import { WmAccessoriesComponent } from './wm-accessories/wm-accessories.component';

const routes: Routes = [
  { path: '', component: WomenComponent },
  {
    path: 'women',
    children: [
      { path: '', redirectTo: 'women', pathMatch: 'full' },
      { path: 'shoes', component: WmShoesComponent },
      { path: 'top', component: WmTopComponent },
      { path: 'bottom', component: WmBottomComponent },
      { path: 'shoes-u100', component: WmShoesU100Component },
      { path: 'accessories', component: WmAccessoriesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WomenRoutingModule { }