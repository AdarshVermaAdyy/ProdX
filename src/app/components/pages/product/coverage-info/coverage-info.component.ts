import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface InputField{
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox';
  options?: Options[] | [];
  isVisible?: boolean,
  category: string
}

interface Options {
  name: string;
  value: string;
}

@Component({
  selector: 'app-coverage-info',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule],
  templateUrl: './coverage-info.component.html',
  styleUrl: './coverage-info.component.scss'
})
export class CoverageInfoComponent {

  productDetailsForm: FormGroup;

  optionalFieldsList: InputField[] = [
    {label: "Coverage Structure", formControlName: 'coverage_struc', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Beneficiary Category", formControlName: 'Beneficiary', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Supplemental Death Benefit", formControlName: 'Death_benefit', type: 'text', isVisible: false, category: 'basicInformation'},

  ]

  constructor(private _fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.initialiseForm();
  }


  initialiseForm(){
    this.productDetailsForm = this._fb.group({
      coverageCode: new FormControl('',[Validators.required]),
      cover_name1: new FormControl('',[Validators.required]),
      cover_type: new FormControl('',[Validators.required]),
      coverageAmount: new FormControl('',[Validators.required]),
      coverageTerm: new FormControl('',[Validators.required]),
      coverageEffectiveDate:new FormControl('',[Validators.required]),
      coverageExpiryDate:new FormControl('',[Validators.required]),
      coveragePremium: new FormControl('',[Validators.required]),
      waiting_period: new FormControl('',[Validators.required]),
      coverage_condition:new FormControl(''),

    })
  }

  //getters
  get coverageCode(){
    return this.productDetailsForm.get('coverageCode');
  }
  get cover_name1(){
    return this.productDetailsForm.get('cover_name1');
  }
  get cover_type(){
    return this.productDetailsForm.get('cover_type');
  }
  get coverageAmount(){
    return this.productDetailsForm.get('coverageAmount');
  }
  get coverageTerm(){
    return this.productDetailsForm.get('coverageTerm');
  }
  get coverageEffectiveDate(){
    return this.productDetailsForm.get('coverageEffectiveDate');
  }
  get coverageExpiryDate(){
    return this.productDetailsForm.get('coverageExpiryDate');
  }
  get coveragePremium(){
    return this.productDetailsForm.get('coveragePremium');
  }
  get waiting_period(){
    return this.productDetailsForm.get('waiting_period');
  }
  get coverage_condition(){
    return this.productDetailsForm.get('coverage_condition');
  }

  get coverage_struc(){
    return this.productDetailsForm.get('coverage_struc');
  }
  get Beneficiary(){
    return this.productDetailsForm.get('Beneficiary');
  }
  get Death_benefit(){
    return this.productDetailsForm.get('Death_benefit');
  }
  get underwritingGuidelines(){
    return this.productDetailsForm.get('underwritingGuidelines');
  }
  get underwritingRequirements(){
    return this.productDetailsForm.get('underwritingRequirements');
  }
  get riskAssessCriteria(){
    return this.productDetailsForm.get('riskAssessCriteria');
  }
  get refundablePrem(){
    return this.productDetailsForm.get('refundablePrem');
  }
  get taxBenefits(){
    return this.productDetailsForm.get('taxBenefits');
  }
  get renewal(){
    return this.productDetailsForm.get('renewal');
  }

  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      this.productDetailsForm.addControl(field.formControlName, new FormControl('', [Validators.required]));
    } else {
      this.productDetailsForm.removeControl(field.formControlName);
    }
  }

  selectUnselectGroup(event, field){
    const relFields = this.optionalFieldsList.filter(item => item.category === field.category);
    if(event.checked){
      relFields.forEach(item => {
        this.addRemoveControls(true, item);
      })
    } else {
      relFields.forEach(item => {
        this.addRemoveControls(false, item);
      })
    }
  }


}
