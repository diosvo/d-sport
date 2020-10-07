import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

import { AccessoriesRoutingModule } from './accessories-routing.module';
import { AccessoriesComponent } from './accessories.component';

@NgModule({
  declarations: [AccessoriesComponent],
  imports: [
    CommonModule,
    AccessoriesRoutingModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [AccessoriesComponent]
})
export class AccessoriesModule { }
