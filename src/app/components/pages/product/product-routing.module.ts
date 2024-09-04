import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:'',
    component: TemplateManagementComponent
  },
  {
    path:'product-details',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
