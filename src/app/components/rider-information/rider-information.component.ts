import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


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
  selector: 'app-rider-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule, MatCheckboxModule,
    MatInputModule, MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './rider-information.component.html',
  styleUrl: './rider-information.component.scss'
})

export class RiderInformationComponent implements OnInit {
  riderForm : FormGroup;
  
  

  optionalFieldsList:  InputField[] = [
    {label: "Rider Age Restriction", formControlName: 'RiderAgeRestriction', type: 'text', isVisible: false, category: 'riderDetails',},
    {label: "Rider Coverage Trigger", formControlName: 'RiderCoverageTrigger', type: 'text', isVisible: false, category: 'riderDetails'},
    {label: "Rider Coverage Reduction", formControlName: 'RiderCoverageReduction', type: 'text', isVisible: false, category: 'riderDetails'},
    {label: "Rider Payout Frequency", formControlName: 'RiderPayoutFrequency', type: 'text', isVisible: false, category: 'PremiumandPayment'},
    {label: "Rider Premium Waiver Clause", formControlName: 'RiderPremiumWaiverClause', type: 'text', isVisible: false, category: 'PremiumandPayment'},
    {label: "Rider Automatic Increase", formControlName: 'RiderAutomaticIncrease', type: 'text', isVisible: false, category: 'PremiumandPayment'},
    // {label: "Refundable Premium", formControlName: 'refundablePrem', type: 'text', isVisible: false, category: 'refundablePrem'},
    // {label: "Tax Benefits", formControlName: 'taxBenefits', type: 'text', isVisible: false, category: 'refundablePrem'},
    // {label: "Renewal", formControlName: 'renewal', type: 'text', isVisible: false, category: 'refundablePrem'},
  ]
  constructor(private fb:FormBuilder) {
   
  }
  ngOnInit() {
    this.initializeForm();
    
  }
  initializeForm(){
    this.riderForm = this.fb.group({
      RiderCode1: ['', Validators.required],
      RiderName1:['', Validators.required],
      RiderType: ['', Validators.required],
      RiderCoverageAmount: ['', Validators.required],
      RiderTerm: ['', Validators.required],
      RiderEffectiveDate: ['', Validators.required],
      RiderExpireyDate: ['', Validators.required],
      RiderPremium: ['', Validators.required],
     // riderDetails: this.fb.array([this.createOptionalField()])
    });
    console.log(this.riderForm.value,"RiderCheck");
  }


  get RiderCode1(){
    return this.riderForm.get('RiderCode1');
  }
  get RiderName1(){
    return this.riderForm.get('RiderName1');
  }
  get RiderType(){
    return this.riderForm.get('RiderType');
  }
  get  RiderCoverageAmount(){
    return this.riderForm.get(' RiderCoverageAmount');
  }
  get RiderTerm(){
    return this.riderForm.get('RiderTerm');
  }
  get RiderEffectiveDate(){
    return this.riderForm.get('RiderEffectiveDate');
  }
  get RiderExpireyDate(){
    return this.riderForm.get('RiderExpireyDate');
  }
  get RiderPremium(){
    return this.riderForm.get('RiderPremium');
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
  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      this.riderForm.addControl(field.formControlName, new FormControl('', [Validators.required]));
    } else {
      this.riderForm.removeControl(field.formControlName);
    }
  }
  

}
