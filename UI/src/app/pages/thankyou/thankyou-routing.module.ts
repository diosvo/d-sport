import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThankyouComponent } from './thankyou.component';

const routes: Routes = [{ path: '', component: ThankyouComponent, data: { title: 'Thank you for choosing us!.' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ThankyouRoutingModule { }