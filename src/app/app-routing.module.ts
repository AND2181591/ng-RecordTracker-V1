import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
    {
      path: 'home', 
      canLoad: [AuthGuard], 
      loadChildren: () => 
        import('./home/home.module').then(m => m.HomeModule)
    }, 
    {
        path: 'onTheirWay', 
        canLoad: [AuthGuard], 
        loadChildren: () => 
            import('./on-their-way/on-their-way.module').then(m => m.OnTheirWayModule)
    }, 
    {
        path: 'preorders', 
        canLoad: [AuthGuard], 
        loadChildren: () => 
            import('./preorders/preorders.module').then(m => m.PreordersModule)
    }
    // {
    //   path: '**', 
    //   loadChildren: () => 
    //     import('./shared/shared.module').then(m => m.SharedModule)
    // }
    // { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
