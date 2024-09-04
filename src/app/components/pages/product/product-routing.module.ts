import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProdInfoFormComponent } from '../../prod-info-form/prod-info-form.component';

const routes: Routes = [
  {
    path:'template-management',
    component: TemplateManagementComponent
  },
  {
    path:'product-details',
    component: ProductDetailsComponent
  },
  {
    path: "product-management",
    component: ProductManagementComponent
  },
  {
    path: 'product-info',
    component: ProdInfoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
