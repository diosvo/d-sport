import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KidsComponent } from './kids.component';
import { KShoesComponent } from './k-shoes/k-shoes.component';
import { KTopComponent } from './k-top/k-top.component';
import { KBottomComponent } from './k-bottom/k-bottom.component';
import { KAccessoriesComponent } from './k-accessories/k-accessories.component';


const routes: Routes = [
  { path: '', component: KidsComponent },
  {
    path: 'kids',
    children: [
      { path: '', redirectTo: 'kids', pathMatch: 'full' },
      { path: 'shoes', component: KShoesComponent },
      { path: 'top', component: KTopComponent },
      { path: 'bottom', component: KBottomComponent },
      { path: 'accessories', component: KAccessoriesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsRoutingModule { }
