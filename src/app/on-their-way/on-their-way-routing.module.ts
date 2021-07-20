import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnTheirWayComponent } from './on-their-way/on-their-way.component';


const routes: Routes = [
  { path: '', component: OnTheirWayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnTheirWayRoutingModule { }
