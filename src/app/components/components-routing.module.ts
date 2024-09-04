import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Components } from './components.component';
// import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path : '',
    component : Components,
    children:[
      
      {
        path : 'product',
        loadChildren : () => import('../components/pages/product/product.module').then(m=>m.ProductModule)
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
export class ComponentsRoutingModule { }