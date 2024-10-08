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
        component: DashboardComponent,
        data : {breadcrumb : 'Dashboard'}
      },
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch: 'full',
        data : {breadcrumb : 'Dashboard'}
      },

      {
        path : 'product',
        loadChildren : () => import('../components/pages/product/product.module').then(m=>m.ProductModule),
        data : {breadcrumb : 'Product'}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
