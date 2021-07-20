import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreordersRoutingModule } from './preorders-routing.module';
import { PreordersComponent } from './preorders/preorders.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PreordersComponent
  ],
  imports: [
    CommonModule,
    PreordersRoutingModule, 
    SharedModule
  ]
})
export class PreordersModule { }
