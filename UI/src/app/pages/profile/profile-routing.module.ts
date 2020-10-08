import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileGuard } from 'src/app/guard/profile.guard';

const routes: Routes = [{ path: '', component: ProfileComponent, canActivate: [ProfileGuard]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }