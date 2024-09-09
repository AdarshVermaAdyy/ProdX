import { Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CoverageInfoComponent } from '../coverage-info/coverage-info.component';
import { ProdInfoFormComponent } from '../prod-info-form/prod-info-form.component';

@Component({
  selector: 'app-create-using-template',
  standalone: true,
  imports: [MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailsComponent,
  CoverageInfoComponent,
  ProdInfoFormComponent
],
  templateUrl: './create-using-template.component.html',
  styleUrl: './create-using-template.component.scss'
})
export class CreateUsingTemplateComponent {
  
  
  @ViewChild(ProductDetailsComponent) ProductDetailsComponent: ProductDetailsComponent;
  @ViewChild(ProdInfoFormComponent) ProdInfoFormComponent: ProdInfoFormComponent;
  @ViewChild(CoverageInfoComponent) CoverageInfoComponent: CoverageInfoComponent;

  get productDetailsForm() {
    return this.ProductDetailsComponent ? this.ProductDetailsComponent.productDetailsForm : null;
 }
 get dynamicForm() {
  return this.ProdInfoFormComponent ? this.ProdInfoFormComponent.dynamicForm : null;
}

get coverageInfoForm() {
  return this.CoverageInfoComponent ? this.CoverageInfoComponent.coverageInfoForm : null;
}
}
