import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KidsComponent } from './kids.component';
import { KShoesComponent } from './k-shoes/k-shoes.component';
import { KTopComponent } from './k-top/k-top.component';
import { KBottomComponent } from './k-bottom/k-bottom.component';
import { KAccessoriesComponent } from './k-accessories/k-accessories.component';


const routes: Routes = [
  { path: '', component: KidsComponent, data: { title: 'D Kids.' } },
  {
    path: 'kids',
    children: [
      { path: '', redirectTo: 'kids', pathMatch: 'full' },
      { path: 'shoes', component: KShoesComponent, data: { title: 'Kids Shoes.' } },
      { path: 'top', component: KTopComponent, data: { title: 'Kids Top.' } },
      { path: 'bottom', component: KBottomComponent, data: { title: 'Kids Bottom.' } },
      { path: 'accessories', component: KAccessoriesComponent, data: { title: 'Kids Accessories.' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsRoutingModule { }
