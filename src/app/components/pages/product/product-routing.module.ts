import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProdInfoFormComponent } from './prod-info-form/prod-info-form.component';
import { CoverageInfoComponent } from './coverage-info/coverage-info.component';
import { CreateUsingTemplateComponent } from './create-using-template/create-using-template.component';

const routes: Routes = [
  {
    path : '',

    children : [
      {
        path:'template-management',
        component: TemplateManagementComponent,
        data : {breadcrumb : 'Template Management'},
      },
      {
        path : '',
        redirectTo : 'template-management',
        pathMatch: 'full'
      },
      {
        path: "product-management",
        component: ProductManagementComponent,
        data : {breadcrumb : 'Product Management'}
      },
      {
        path:"create-product",
        component: CreateUsingTemplateComponent,
        data : {breadcrumb : 'Create product using template'}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
