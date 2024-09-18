import { Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CoverageInfoComponent } from '../coverage-info/coverage-info.component';
import { ProdInfoFormComponent } from '../prod-info-form/prod-info-form.component';
import { HeaderRibbonComponent } from '../../../../shared/header-ribbon/header-ribbon.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RiderInformationComponent } from "../../../rider-information/rider-information.component";

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
    ProdInfoFormComponent,
    HeaderRibbonComponent,
    MatSidenavModule, MatIconModule, RiderInformationComponent],
  templateUrl: './create-using-template.component.html',
  styleUrl: './create-using-template.component.scss'
})
export class CreateUsingTemplateComponent {

  selectedStep: any;
  currentStep;

  @ViewChild(ProductDetailsComponent) ProductDetailsComponent: ProductDetailsComponent;
  @ViewChild(ProdInfoFormComponent) ProdInfoFormComponent: ProdInfoFormComponent;
  @ViewChild(CoverageInfoComponent) CoverageInfoComponent: CoverageInfoComponent;
  @ViewChild(RiderInformationComponent)RiderInformationComponent:RiderInformationComponent;

  ngOnInit(): void {}

  get productDetailsForm() {
    return this.ProductDetailsComponent ? this.ProductDetailsComponent.productDetailsForm : null;
 }
 get dynamicForm() {
  return this.ProdInfoFormComponent ? this.ProdInfoFormComponent.dynamicForm : null;
}

get coverageInfoForm() {
  return this.CoverageInfoComponent ? this.CoverageInfoComponent.coverageInfoForm : null;
}
get riderDetailsForm(){
  return this.RiderInformationComponent ? this.RiderInformationComponent.riderDetailsForm : null;

}

onStepChange(event,stepper){
  this.currentStep = stepper;
}

}
