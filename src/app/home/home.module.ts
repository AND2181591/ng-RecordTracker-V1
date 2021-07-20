import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    HomeComponent, 
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HomeRoutingModule, 
    ReactiveFormsModule, 
    SharedModule, 
    NgbTypeaheadModule
  ]
})
export class HomeModule { }
