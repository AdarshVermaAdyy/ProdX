import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoServiceService {

  
  private availableOptions = [
    { id: 1, label: "Entity Age", type: "range", min: 18, max: 65, group: 'productBoundaryCondition' },
    { id: 2, label: "Maturity Age", type: "range", min: 28, max: 65, group: 'productBoundaryCondition' },
    { id: 3, label: "Premium", type: "range", min: 1500, max: 300000, group: 'productBoundaryCondition' },
   
    { id: 4, label: "Premium Payment Type", type: 'radio', options: ['Regular', 'Limited'], group: 'productBoundaryCondition' },
    { id: 5, label: "Premium Payment Frequency", type: 'dropdown', options: ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition'},
    { id: 6, label: "PT (In Year)", type: 'dropdown', options: ['5','10', '15', '20'], group: 'productBoundaryCondition' },
    { id: 7, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' },
    { id: 8, label: "PT (In Year)", type: 'dropdown', options: ['10', '20', '30'], group: 'productBoundaryCondition' },
    { id: 9, label: "Sum Assured", type: "range", min: 100000, max: 300000, group: 'productBoundaryCondition' },
    { id: 10, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' },
    // { id: 5, label: "Gender", type: 'dropdown', options: ['Male', 'Female', 'Other'], group: 'productBoundaryCondition' },
    // { id: 6, label: "Username", type: "text", value: "ahakal", group: 'productBoundaryCondition' },
    { id: 11, label: "Grace Period", type: 'dropdown', options: ['15', '30', '60'], group: 'productBoundaryCondition' },
    { id: 12, label: "BackDating", type: 'dropdown', options: ['Yes', 'No'], group: 'productBoundaryCondition' },
   
   
    { id: 13, label: "Change of Name", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 14, label: "Appointee Change", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 15, label: "Letters", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 16, label: "Nach Registration", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 17, label: "Change of Owner", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 18, label: "Change of Nominee", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 19, label: "Assignment/Reassignment", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 20, label: "Change of Address", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 21, label: "Change of Freq", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 22, label: "Change of Contact Details", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 23, label: "Change in PAN", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 24, label: "Duplicate policy Number", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 25, label: "EIA", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 26, label: "Change in Occupation", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 27, label: "Change of PEP", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 28, label: "Change in UID", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 29, label: "Certification of Existance", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },
    { id: 30, label: "Policy Search UI", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' },

    { id: 31, label: "Lapse", type: 'dropdown', options: ['LAPSE30', 'LAPSE1530', 'NA'], group: 'featreandReinsate' },
    { id: 32, label: "Revival", type: 'dropdown', options: ['REVIV30', 'REVIV75', 'REVIVTS','REVIVT5', 'REVIVT3', 'REVIVE', 'NA'], group: 'featreandReinsate' },

    { id: 33, label: "Increase/Decrease in Service", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration' },
    { id: 34, label: "Change of DOB", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration' },
    { id: 35, label: "Change of Gender", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' },
    { id: 36, label: "Change of PT/FT", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' },
    { id: 37, label: "Change of Premium", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' },

    { id: 38, label: "Free Look Period Cancell", type: 'dropdown', options: ['FP15', 'FP16'], group: 'terminationCancellation' },
    
    { id: 39, label: " Death Claim ", type: 'dropdown', options: ['DPRP', 'DSING', 'DLUMP','DMNIC5', 'NA'], group: 'terminationCancellation' },
    { id: 40, label: "   Surrender  ", type: 'dropdown', options: ['SURNORM', 'SUR3', 'SUR0BEN'], group: 'terminationCancellation' },
    { id: 41, label: "    Maturity  ", type: 'dropdown', options: ['M0BEN', 'MTERM', 'NA'], group: 'terminationCancellation' },
    
    { id: 42, label: "Policy Cancellation", type: 'dropdown', options: ['POLC', 'NA'], group: 'terminationCancellation' },
    

  ];

 private optionalFieldsList = [
  { id: 43, label: "Product Start Date", type: 'date', group: 'productBoundary', selected:false },
  { id: 44, label: "Product End Date", type: 'date', group: 'productBoundary' , selected:false },
    // { id: 41, label: "Product Start Date", type: "range", min: 18, max: 50, group: 'productBoundary' },
    // { id: 42, label: "Product End Date", type: "range", min: 18, max: 50, group: 'productBoundary' },
    { id: 45, label: "Comunication Preferences", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' , selected:false},
    { id: 46, label: "Beneficiary Update Process", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration', selected:false},
    { id: 47, label: "Termination Reason Code", type: 'dropdown', options: ['TERM1', 'TERM2'], group: 'terminationCancellation', selected:false },
    { id: 48, label: "Premium Adjustment Option", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail', selected:false},
    { id: 49, label: "Premium Loading", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail', selected:false },
    { id: 50, label: "Premium Payment Methods", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail', selected:false },
    { id: 51, label: "Payment Frequency Change", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail'  , selected:false },
    { id: 52, label: "Partial Payment Option", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail' , selected:false },
    { id: 53, label: "Payment Reschedulting", type: 'dropdown', options: ['POLC', 'NA'], group: 'PremiumandPaymentDetail' , selected:false },
  ]
  constructor(private fb: FormBuilder) {}

  getAvailableOptions() {
    return this.availableOptions;
  }

  getOptionalFieldOptions() {
    return this.optionalFieldsList;
  }

  createDynamicFormGroup(label: string, type: string, config: any) {
    const controls: any = {
      label: [label],
      type: [type]
    };

    if (type === 'range') {
      controls['min'] = [config.min, Validators.required];
      controls['max'] = [config.max, Validators.required];
    } else if (type === 'dropdown') {
      const defaultValue = config.defaultValue || (config.options && config.options[0]) || '';
      controls['value'] = [defaultValue, Validators.required];
      controls['options'] = [config.options || []];
    } else if (type === 'text') {
      controls['value'] = [config.value || '', Validators.required];
    } else if (type === 'radio') {
      controls['options'] = [config.options || []];
      controls['value'] = [config.value || '', Validators.required];
    }
    else if (type === 'date') {
     // controls['value'] = [config.value || '', Validators.required];
       controls['value'] = [new Date(), Validators.required];
      // controls['maxDate'] = [new Date(), Validators.required];

    }

    return this.fb.group(controls);
  }

  initializeForm(): FormGroup {
    const form = this.fb.group({
      options: this.fb.array(this.availableOptions.map(option => new FormControl(false))),
      optionalOption: this.fb.array(this.optionalFieldsList.map(option =>new FormControl(false))),
      selectedValues: this.fb.group({
        productBoundaryCondition: this.fb.array([]),
        premiumDetails: this.fb.array([]),
        featreandReinsate: this.fb.array([]),
        productServicingAlteration: this.fb.array([]),
        terminationCancellation: this.fb.array([]),
        productBoundary: this.fb.array([]),
        PremiumandPaymentDetail: this.fb.array([])

      })
    });

    this.updateFormGroups(form);
    return form;
  }

  updateFormGroups(form: FormGroup) {
    const productBoundaryConditions = this.availableOptions
      .filter(option => option.group === 'productBoundaryCondition')
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));

    const premiumDetails = this.availableOptions
      .filter(option => option.group === 'premiumDetails')
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));

      const featreandReinsate = this.availableOptions
      .filter(option => option.group === 'featreandReinsate')
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));

      const productServicingAlteration = this.availableOptions
      .filter(option => option.group === 'productServicingAlteration')
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));
      
      const terminationCancellation = this.availableOptions
      .filter(option => option.group === 'terminationCancellation')
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));

      const productBoundaryOnlySelected = form.get('optionalOptions')?.value.some((checked: boolean, index:number)=>{
        return checked && this.optionalFieldsList[index].group ==='productBoundary';
      })
const PremiumandPaymentDetailSelected = form.get('optionalOptions')?.value.some((checked: boolean, index:number)=>{
  return checked && this.optionalFieldsList[index].group ==='PremiumandPaymentDetail';
})

      const productBoundaryOnly = this.optionalFieldsList
      .filter(option => option.group === 'productBoundary' && productBoundaryOnlySelected)
      .map(option=> this.createDynamicFormGroup(option.label, option.type, option));
     
      const PremiumandPaymentDetailOnly = this.optionalFieldsList
      .filter(option => option.group === 'PremiumandPaymentDetail' && PremiumandPaymentDetailSelected)
      .map(option => this.createDynamicFormGroup(option.label, option.type, option));
      

      

    const productBoundaryFormArray = form.get('selectedValues.productBoundaryCondition') as FormArray;
    const premiumDetailsFormArray = form.get('selectedValues.premiumDetails') as FormArray;
    const featreandReinsateFormArray = form.get('selectedValues.featreandReinsate') as FormArray;
    const productServicingAlterationArray = form.get('selectedValues.productServicingAlteration') as FormArray;
    const terminationCancellationArray = form.get('selectedValues.terminationCancellation') as FormArray;
    const productBoundaryFormArrayOnly = form.get('selectedValues.productBoundary') as FormArray;
     const PremiumandPaymentDetailSelectedArray = form.get('selectedValues.PremiumandPaymentDetail') as FormArray;

    productBoundaryFormArray.clear();
    premiumDetailsFormArray.clear();
   featreandReinsateFormArray.clear();
   productServicingAlterationArray.clear();
   terminationCancellationArray.clear();
   productBoundaryFormArrayOnly.clear();
   PremiumandPaymentDetailSelectedArray.clear();
   
    productBoundaryConditions.forEach(group => productBoundaryFormArray.push(group));
    premiumDetails.forEach(group => premiumDetailsFormArray.push(group));
   featreandReinsate.forEach(group => featreandReinsateFormArray.push(group));
    productServicingAlteration.forEach(group => productServicingAlterationArray.push(group));
    terminationCancellation.forEach(group=> terminationCancellationArray.push(group));
    productBoundaryOnly.forEach(group=> productBoundaryFormArrayOnly.push(group));
    PremiumandPaymentDetailOnly.forEach(group=> PremiumandPaymentDetailSelectedArray.push(group));
  }

}
