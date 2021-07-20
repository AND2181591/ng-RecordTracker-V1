import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnTheirWayRoutingModule } from './on-their-way-routing.module';
import { OnTheirWayComponent } from './on-their-way/on-their-way.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OnTheirWayComponent
  ],
  imports: [
    CommonModule,
    OnTheirWayRoutingModule, 
    SharedModule
  ]
})
export class OnTheirWayModule { }
