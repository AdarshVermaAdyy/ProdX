import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path : '',
    component : MasterComponent,
    children:[
      
      {
        path : 'product',
        loadChildren : () => import('../product/product.module').then(m=>m.ProductModule)
      },
      {
        path:'',
        redirectTo : 'product',
        pathMatch : 'full'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
