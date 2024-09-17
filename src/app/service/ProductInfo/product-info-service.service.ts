import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoServiceService {

  
  private availableOptions = [ ];

 private optionalFieldsList = [
  { id: 1, label: "Premium Payment Frequency", type: 'checkbox', options: [ 'Single','Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition', selected:false},
  { id: 2, label: "Entity Age", type: "range", min: 18, max: 65, group: 'productBoundaryCondition' , selected:false},
    { id: 3, label: "Maturity Age", type: "range", min: 28, max: 65, group: 'productBoundaryCondition', selected:false },
    { id: 4, label: "Premium", type: "range", min: 1500, max: 300000, group: 'productBoundaryCondition', selected:false },
   
    { id: 5, label: "Premium Payment Type", type: 'radio', options: ['Regular', 'Limited'], group: 'productBoundaryCondition', selected:false },
    // { id: 5, label: "Premium Payment Frequency", type: 'dropdown', options: ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition', selected:false},
    { id: 6, label: "PT (In Year)", type: 'dropdown', options: ['5','10', '15', '20'], group: 'productBoundaryCondition', selected:false },
    { id: 7, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
    { id: 8, label: "PT (In Year)", type: 'dropdown', options: ['10', '20', '30'], group: 'productBoundaryCondition', selected:false },
    { id: 9, label: "Sum Assured", type: "range", min: 100000, max: 300000, group: 'productBoundaryCondition' },
    { id: 10, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
    // { id: 5, label: "Gender", type: 'dropdown', options: ['Male', 'Female', 'Other'], group: 'productBoundaryCondition' },
    // { id: 6, label: "Username", type: "text", value: "ahakal", group: 'productBoundaryCondition' },
    { id: 11, label: "Grace Period", type: 'dropdown', options: ['15', '30', '60'], group: 'productBoundaryCondition' , selected:false},
    { id: 12, label: "BackDating", type: 'dropdown', options: ['Yes', 'No'], group: 'productBoundaryCondition', selected:false },
   
   
    { id: 13, label: "Change of Name", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' ,  selected:false},
    { id: 14, label: "Appointee Change", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations'  , selected:false},
    { id: 15, label: "Letters", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations',  selected:false },
    { id: 16, label: "Nach Registration", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 17, label: "Change of Owner", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 18, label: "Change of Nominee", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 19, label: "Assignment/Reassignment", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 20, label: "Change of Address", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 21, label: "Change of Freq", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 22, label: "Change of Contact Details", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 23, label: "Change in PAN", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 24, label: "Duplicate policy Number", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 25, label: "EIA", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 26, label: "Change in Occupation", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 27, label: "Change of PEP", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 28, label: "Change in UID", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 29, label: "Certification of Existance", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },
    { id: 30, label: "Policy Search UI", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false },

    { id: 31, label: "Lapse", type: 'dropdown', options: ['LAPSE30', 'LAPSE1530', 'NA'], group: 'featreandReinsate' , selected:false},
    { id: 32, label: "Revival", type: 'dropdown', options: ['REVIV30', 'REVIV75', 'REVIVTS','REVIVT5', 'REVIVT3', 'REVIVE', 'NA'], group: 'featreandReinsate', selected:false },

    { id: 33, label: "Increase/Decrease in Service", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration', selected:false },
    { id: 34, label: "Change of DOB", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration', selected:false },
    { id: 35, label: "Change of Gender", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' ,selected:false},
    { id: 36, label: "Change of PT/FT", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration', selected:false },
    { id: 37, label: "Change of Premium", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' ,selected:false},

    { id: 38, label: "Free Look Period Cancell", type: 'dropdown', options: ['FP15', 'FP16'], group: 'terminationCancellation' , selected:false},
    
    { id: 39, label: " Death Claim ", type: 'dropdown', options: ['DPRP', 'DSING', 'DLUMP','DMNIC5', 'NA'], group: 'terminationCancellation', selected:false },
    { id: 40, label: "   Surrender  ", type: 'dropdown', options: ['SURNORM', 'SUR3', 'SUR0BEN'], group: 'terminationCancellation', selected:false },
    { id: 41, label: "    Maturity  ", type: 'dropdown', options: ['M0BEN', 'MTERM', 'NA'], group: 'terminationCancellation', selected:false },
    
    { id: 42, label: "Policy Cancellation", type: 'dropdown', options: ['POLC', 'NA'], group: 'terminationCancellation' , selected:false},
    
//////////////////////

  { id: 43, label: "Product Start Date", type: 'date', group: 'productBoundaryCondition', selected:false },
  { id: 44, label: "Product End Date", type: 'date', group: 'productBoundaryCondition' , selected:false },
    // { id: 41, label: "Product Start Date", type: "range", min: 18, max: 50, group: 'productBoundary' },
    // { id: 42, label: "Product End Date", type: "range", min: 18, max: 50, group: 'productBoundary' },
    { id: 45, label: "Comunication Preferences", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServiceNonfinancialAlterations' , selected:false},
    { id: 46, label: "Beneficiary Update Process", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServiceNonfinancialAlterations', selected:false},
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
     console.log("here is a dynamic form group label creation : " + label);
    if (type === 'range') {
      if(label === 'Entity Age') {
        controls['min'] = [config.min, [Validators.required, Validators.min(18), Validators.pattern(/^\d+$/)]];
        controls['max'] = [config.max, [Validators.required, Validators.max(65), Validators.pattern(/^\d+$/)]];
      } 
      else{
      controls['min'] = [config.min,[ Validators.required, Validators.pattern(/^\d+$/)]];
      controls['max'] = [config.max, [Validators.required, Validators.pattern(/^\d+$/)]];
      }
    } else if (type === 'dropdown') {
      const defaultValue = config.defaultValue || (config.options && config.options[0]) || '';
      controls['value'] = [defaultValue, Validators.required];
      controls['options'] = [config.options || []];
    } else if (type === 'text') {
      controls['value'] = [config.value || '', Validators.required];
    } else if (type === 'radio') {
      controls['options'] = [config.options || '', Validators.required];
      controls['value'] = [config.value || '', Validators.required];
    }
    else if (type === 'date') {
     // controls['value'] = [config.value || '', Validators.required];
       controls['value'] = [new Date(), Validators.required];
      // controls['maxDate'] = [new Date(), Validators.required];

    }
    else if (type === 'checkbox') {
      const optionControls = {};
    config.options.forEach((option, index) => {
      optionControls[option] = [false];
      //controls[option] = false;
    });
    controls['options'] = [config.options || []];
    controls['optionControls'] = this.fb.group(optionControls);
     
    }

    return this.fb.group(controls);
  }

  initializeForm(): FormGroup {
    const form = this.fb.group({
      options: this.fb.array(this.availableOptions.map(option => new FormControl(false))),
      optionalOption: this.fb.array(this.optionalFieldsList.map(option =>new FormControl(false))),
      selectedValues: this.fb.group({
        productBoundaryCondition: this.fb.array([]),
        productServiceNonfinancialAlterations: this.fb.array([]),
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

    const productServiceNonfinancialAlterations = this.availableOptions
      .filter(option => option.group === 'productServiceNonfinancialAlterations')
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
    const productServiceNonfinancialAlterationsFormArray = form.get('selectedValues.productServiceNonfinancialAlterations') as FormArray;
    const featreandReinsateFormArray = form.get('selectedValues.featreandReinsate') as FormArray;
    const productServicingAlterationArray = form.get('selectedValues.productServicingAlteration') as FormArray;
    const terminationCancellationArray = form.get('selectedValues.terminationCancellation') as FormArray;
    const productBoundaryFormArrayOnly = form.get('selectedValues.productBoundary') as FormArray;
     const PremiumandPaymentDetailSelectedArray = form.get('selectedValues.PremiumandPaymentDetail') as FormArray;

    productBoundaryFormArray.clear();
    productServiceNonfinancialAlterationsFormArray.clear();
   featreandReinsateFormArray.clear();
   productServicingAlterationArray.clear();
   terminationCancellationArray.clear();
   productBoundaryFormArrayOnly.clear();
   PremiumandPaymentDetailSelectedArray.clear();
   
    productBoundaryConditions.forEach(group => productBoundaryFormArray.push(group));
    productServiceNonfinancialAlterations.forEach(group => productServiceNonfinancialAlterationsFormArray.push(group));
    featreandReinsate.forEach(group => featreandReinsateFormArray.push(group));
    productServicingAlteration.forEach(group => productServicingAlterationArray.push(group));
    terminationCancellation.forEach(group=> terminationCancellationArray.push(group));
    productBoundaryOnly.forEach(group=> productBoundaryFormArrayOnly.push(group));
    PremiumandPaymentDetailOnly.forEach(group=> PremiumandPaymentDetailSelectedArray.push(group));
  }

  
}
