import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenComponent } from './men.component';
import { MenShoesComponent } from './men-shoes/men-shoes.component';
import { MenTopComponent } from './men-top/men-top.component';
import { MenBottomComponent } from './men-bottom/men-bottom.component';
import { MenAccessoriesComponent } from './men-accessories/men-accessories.component';

const routes: Routes = [
  { path: '', component: MenComponent },
  {
    path: 'men',
    children: [
      { path: '', redirectTo: 'men', pathMatch: 'full' },
      { path: 'shoes', component: MenShoesComponent },
      { path: 'top', component: MenTopComponent },
      { path: 'bottom', component: MenBottomComponent },
      { path: 'accessories', component: MenAccessoriesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenRoutingModule { }