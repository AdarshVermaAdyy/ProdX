import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Components } from './components.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path : '',
    component : Components,
    children:[

      {
        path : 'dashboard',
        component: DashboardComponent
      },
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch: 'full'
      },

      {
        path : 'product',
        loadChildren : () => import('../components/pages/product/product.module').then(m=>m.ProductModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
