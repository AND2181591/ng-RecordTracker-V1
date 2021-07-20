import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreordersComponent } from './preorders/preorders.component';


const routes: Routes = [
  { path: '', component: PreordersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreordersRoutingModule { }
