import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputComponent } from './input/input.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalComponent } from './modal/modal.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    InputComponent, 
    ModalComponent, OrderListComponent, AlertComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SharedRoutingModule, 
    FormsModule, 
    NgbModule
  ], 
  exports: [
    InputComponent, 
    ModalComponent, 
    OrderListComponent, 
    AlertComponent
  ]
})
export class SharedModule { }
