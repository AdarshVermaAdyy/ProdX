import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ProductInfoServiceService } from '../../../../service/ProductInfo/product-info-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChangeDetectorRef } from '@angular/core';
import { FilterByGroupPipe } from '../../../../filter-by-group.pipe';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { GroupNamePipePipe } from '../../../../group-name-pipe.pipe';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
import { MatDialog } from '@angular/material/dialog';
import {MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { GetSetService } from '../../../../service/get-set.service';
@Component({
  selector: 'app-prod-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule,
    HttpClientModule, MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule,
    MatInputModule, MatRadioModule,
    FilterByGroupPipe, MatGridListModule,
    MatSidenavModule, GroupNamePipePipe,
    MatStepperModule, MatDatepickerModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './prod-info-form.component.html',
  styleUrl: './prod-info-form.component.scss'
})
export class ProdInfoFormComponent implements OnInit {
  isBlankTemplate = ''; 
  isPageBlank = true;
  fileredOptionalList :any;
  isSubmitted = false;
  dynamicForm!: FormGroup;
  availableOptions!: any[];
  numberInputArray : number[] = [];
 // optionalFieldsList!: any[];
  toastType = '';
  showErrorToast = false;
  showSuccessToast = false;
  isProductBoundarySelected: boolean = false;
  isPremiumandPaymentDetail: boolean = false;
  headingDispaly = false;
  isSidenavOpen = true;
  isSidenavCollapsed = false;
  selectAllGroupControl = false;
  productDetailsForm: any;
  receivedshareData: any;
  isMarkedRadioTouched = false;
  //formValue = 'templatated';
  isTeamplateValue = 'true';
  searchForm: FormGroup;
  selectedFrequency: string []= [];
  isSingleSelected: boolean = false;
  isOtherSelected: boolean = false;
//  searchFilterList : any;
optionalFieldsList = [
  { id: 1, label: "Premium Payment Frequency", type: 'checkbox', options: ['Single','Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition', selected:false},
  { id: 2, label: "Entity Age", type: "range", min: 18, max: 65, group: 'productBoundaryCondition' , selected:false},
{ id: 3, label: "Maturity Age", type: "range", min: 28, max: 65, group: 'productBoundaryCondition', selected:false },
{ id: 4, label: "Premium", type: "range", min: 1500, max: 300000, group: 'productBoundaryCondition', selected:false },
{ id: 5, label: "Premium Payment Type", type: 'radio', options: ['Regular', 'Limited'], group: 'productBoundaryCondition', selected:false },
// { id: 5, label: "Premium Payment Frequency", type: 'dropdown', options: ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition', selected:false},
{ id: 6, label: "PT (In Year)", type: 'dropdown', options: ['5','10', '15', '20'], group: 'productBoundaryCondition', selected:false },

{ id: 7, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
{ id: 8, label: "PT (In Year)", type: 'dropdown', options: ['10', '20', '30'], group: 'productBoundaryCondition', selected:false },
{ id: 9, label: "Sum Assured", type: "range", min: 100000, max: 300000, group: 'productBoundaryCondition', selected:false },
{ id: 10, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
// { id: 5, label: "Gender", type: 'dropdown', options: ['Male', 'Female', 'Other'], group: 'productBoundaryCondition' },
// { id: 6, label: "Username", type: "text", value: "ahakal", group: 'productBoundaryCondition' },
{ id: 11, label: "Grace Period", type: 'dropdown', options: ['15', '30', '60'], group: 'productBoundaryCondition' , selected:false},
{ id: 12, label: "BackDating", type: 'dropdown', options: ['Yes', 'No'], group: 'productBoundaryCondition', selected:false },
//{ id: 54, label: "Add PPT Combination With Comma", type: 'text', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},

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
{ id: 30, label: "Policy Search UI", type: 'dropdown', options: ['Yes', 'No'], group: 'productServiceNonfinancialAlterations', selected:false},

{ id: 31, label: "Lapse", type: 'dropdown', options: ['LAPSE30', 'LAPSE1530', 'NA'], group: 'featreandReinsate' , selected:false},
{ id: 32, label: "Revival", type: 'dropdown', options: ['REVIV30', 'REVIV75', 'REVIVTS','REVIVT5', 'REVIVT3', 'REVIVE', 'NA'], group: 'featreandReinsate', selected:false },

{ id: 33, label: "Increase/Decrease in Service", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration', selected:false },
{ id: 34, label: "Change of DOB", type: 'dropdown', options: ['Allowed4', 'Allowed6'], group: 'productServicingAlteration', selected: false },
{ id: 35, label: "Change of Gender", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' ,selected:false},
{ id: 36, label: "Change of PT/FT", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration', selected:false},
{ id: 37, label: "Change of Premium", type: 'dropdown', options: ['Allowed', 'NotAllowed'], group: 'productServicingAlteration' ,selected:false},

{ id: 38, label: "Free Look Period Cancell", type: 'dropdown', options: ['FP15', 'FP16'], group: 'terminationCancellation' , selected:false},

{ id: 39, label: "Death Claim", type: 'dropdown', options: ['DPRP', 'DSING', 'DLUMP','DMNIC5', 'NA'], group: 'terminationCancellation', selected:false},
{ id: 40, label: "Surrender", type: 'dropdown', options: ['SURNORM', 'SUR3', 'SUR0BEN'], group: 'terminationCancellation', selected:false },
{ id: 41, label: "Maturity", type: 'dropdown', options: ['M0BEN', 'MTERM', 'NA'], group: 'terminationCancellation', selected:false},

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
searchResults:any;
commaSeparatedInput: string = '';
commaValueArray : string[] = [];

templateFields = [
  'Entity Age',
  'Maturity Age',
  'Premium',
  'Premium Payment Type',
  'Premium Payment Frequency',
  'PT (In Year)',
  'Add PPT Combination (In Year)',
  'PT (In Year)',
  'Sum Assured',
  'Add PPT Combination (In Year)',
  'Grace Period',
  'BackDating',
  'Change of Name',
  'Appointee Change',
  'Letters',
  'Nach Registration',
  'Change of Owner',
  'Change of Nominee',
  'Assignment/Reassignment',
  'Change of Address',
  'Change of Freq',
  'Change of Contact Details',
  'Change in PAN',
  'Duplicate policy Number',
  'EIA',
  'Change in Occupation',
  'Change of PEP',
  'Change in UID',
  'Certification of Existance',
  'Policy Search UI',
  'Lapse',
  'Revival',
  'Increase/Decrease in Service',
  'Change of DOB',
  'Change of Gender',
  'Change of PT/FT',
  'Change of Premium',
  'Free Look Period Cancell', 
  'Death Claim' ,   
  'Surrender'  ,    
  'Maturity'  ,
  'Policy Cancellation'
]
searchFilterList = this.optionalFieldsList;
readonly panelOpenState = signal(true);

  constructor(private fb: FormBuilder,
     private formService: ProductInfoServiceService,
  
    private shareproductData: ShareproductdataService,
  public dialog: MatDialog ,
  private getSetService: GetSetService) { 
    this.dynamicForm = new FormGroup({});
    this.isBlankTemplate = this.getSetService.get('createMode');
    
  }
  


  ngOnInit() {
    

    this.availableOptions = this.formService.getAvailableOptions();
    this.dynamicForm = this.formService.initializeForm();
    this.dynamicForm.get('optionalOption')?.valueChanges.subscribe(data => {
      this.formService.updateFormGroups(this.dynamicForm);
    });
  
    this.shareproductData.currentData.subscribe(data => {
      this.receivedshareData = data;
    });
 //   this.preselectOption();
 if(this.isBlankTemplate === 'create-by-template'){
  console.log("create-by-template called..");
  this.optionalFieldsList.forEach((field, i) => {
    const isFieldExits = this.templateFields.some(tempField => field.label === tempField);
    if(isFieldExits){
      this.addRemoveControls(true, field, i)
    }
  })
}

 this.initializeSearchForm();
 this.fileredOptionalList = [...this.optionalFieldsList];
  }

  getUniqueGroup() {
    const groups = this.optionalFieldsList.map(option =>
      option.group.trim()
    );
    const uniqueGroups = Array.from(new Set(groups));
    return uniqueGroups;
  }


  get options(): FormArray {
    return this.dynamicForm.get('options') as FormArray;
  }

  get productBoundaryCondition(): FormArray {
    return this.dynamicForm.get('selectedValues.productBoundaryCondition') as FormArray;
  }

  get productBoundary(): FormArray {
    return this.dynamicForm.get('selectedValues.productBoundary') as FormArray;
  }

  get productServiceNonfinancialAlterations(): FormArray {
    return this.dynamicForm.get('selectedValues.productServiceNonfinancialAlterations') as FormArray;
  }
  
  get featreandReinsate(): FormArray {
    return this.dynamicForm.get('selectedValues.featreandReinsate') as FormArray;
  }

  get PremiumandPaymentDetail(): FormArray {
    return this.dynamicForm.get('selectedValues.PremiumandPaymentDetail') as FormArray;
  }
  get selectedGroupIds(): FormArray {
    return this.dynamicForm.get('selectedValues') as FormArray;
  }

  get terminationCancellation(): FormArray {
    return this.dynamicForm.get('selectedValues.terminationCancellation') as FormArray;
  }

  get productServicingAlteration(): FormArray {
    return this.dynamicForm.get('selectedValues.productServicingAlteration') as FormArray;
  }
  
  isDefaultField(option: any): boolean {
    return ['Entity Age', 'Maturity Age', 'Premium Payment Frequency', 'PT (In Year)', 'Gender', 'Username', 'Premium Payment Type'].includes(option.label);
  }
 

  findOptionIndex(label: string, group: string): number {
    const formArray = this.dynamicForm.get(`selectedValues.${group}`) as FormArray;
    return formArray.controls.findIndex(group => group.get('label')?.value === label);
  }

  // isProducBoundarySelect(): boolean {
  //   const productBoundaryselect = this.dynamicForm.get(`selectedValues.productBoundary`) as FormArray;
  //   return productBoundaryselect.controls.some(control => control.get('value')?.value);
  // }
  isPremiumandPaymentDetailSelect(): boolean {
    const PremiumandPaymentDetail = this.dynamicForm.get(`selectedValues.PremiumandPaymentDetail`) as FormArray;
    return PremiumandPaymentDetail.controls.some(control => control.get('value')?.value);
  }
  terminationCancellationSelect(): boolean {
    const terminationCancellation = this.dynamicForm.get(`selectedValues.terminationCancellation`) as FormArray;
    return terminationCancellation.controls.some(control => control.get('value')?.value);

  }

  productServicingMajorAlterationsSelect(): boolean {
    const productServicingAlteration = this.dynamicForm.get(`selectedValues.productServicingAlteration`) as FormArray;
    return productServicingAlteration.controls.some(control => control.get('value')?.value);
  }

  isfeatureandReinstatement(): boolean {
    const featureandReinstatement = this.dynamicForm.get(`selectedValues.featreandReinsate`) as FormArray;
    return featureandReinstatement.controls.some(control => control.get('value')?.value);
  }
  isProductServicNonoFinancialAleration(): boolean {
    const productServicNonoFinancialAleration = this.dynamicForm.get(`selectedValues.productServiceNonfinancialAlterations`) as FormArray;
    return productServicNonoFinancialAleration.controls.some(control => control.get('value')?.value);
  }

  // isproductBoundaryCondition(): boolean {
  //   const productBoundaryConditionValues = this.dynamicForm.get(`selectedValues.productBoundaryCondition`) as FormArray;
  //   return productBoundaryConditionValues.controls.some(control => control.get('value')?.value);
  // }
  
  isproductBoundaryCondition(): boolean {
    const productBoundaryConditionValues = this.dynamicForm.get(`selectedValues.productBoundaryCondition`) as FormArray;
   if(!productBoundaryConditionValues || productBoundaryConditionValues.length === 0){
    return false;
   }
   else{
    return true;
   }
  }
  
  onSubmit() {
    
    if (this.dynamicForm.invalid) {
     
      this.markAllAsTouched();
    } else {
      this.isSubmitted = true;
    
    }
  }
  next() {
    this.isMarkedRadioTouched = true;
    this.processComaInput();
    console.log("Next click");
  }

  markAllAsTouched() {
    this.productBoundaryCondition.controls.forEach(control => control.markAsTouched());
    this.productServiceNonfinancialAlterations.controls.forEach(control => control.markAsTouched());
    this.featreandReinsate.controls.forEach(control => control.markAsTouched());
    this.productServicingAlteration.controls.forEach(control => control.markAsTouched());
    this.terminationCancellation.controls.forEach(control => control.markAsTouched());
    this.productBoundary.controls.forEach(control => control.markAsTouched());
    this.PremiumandPaymentDetail.controls.forEach(control => control.markAsTouched());
  }
  

 
  onSelectedOpend(isOpened: boolean){
    if(isOpened){
   

    }
    else{
      
    }

  }

  //For delete gender field
  deleteGenderField(){
    const fieldLabel = 'Change of Gender';
    const fieldgroup = 'productServicingAlteration'
    const selectedIndex = this.findOptionIndex(fieldLabel, fieldgroup);
    this.productServicingAlteration.removeAt(selectedIndex);
  }

  openDialog(TemplateRef: TemplateRef<any>, $event){
    this.dialog.open(TemplateRef);
  }

  closeDialog(){
    this.dialog.closeAll();
  }
  initializeSearchForm(){
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
  search(event){
    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.optionalFieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
    // this.searchFilterList = this.optionalFieldsList.filter(field => {
    // return   field.label.toLocaleLowerCase().includes(value) 
    // });
    
  }
  searchListByGroup(group: any){
    const SerchedGroupVal = this.searchFilterList.filter(field => 
      field.group === group  
    );
    return SerchedGroupVal
  }

  cancelSearch(){
    this.searchForm.reset();
    this.searchFilterList = this.optionalFieldsList;
  }
  

///////////////


toggleSelectAll(event, group, i: any) {
  const relFields = this.searchFilterList.filter(item => item.group === group);
   console.log("toggleSelectAll.."+ group +" "+ event.checked + i );   

   relFields.forEach((item, index) =>{
    const actualIndex = this.searchFilterList.indexOf(item);
    if(event.checked  && !item.selected){
      this.addRemoveControls(true, item, actualIndex);
    }
    else if(!event.checked && item.selected){
      this.addRemoveControls(false, item, actualIndex);
    }
   });
 
}

addRemoveControls(event: boolean, field: any, i: number) {
  field.selected = event;
  const option = this.searchFilterList[i];

  // Use 'productBoundaryCondition' as groupName for both single and other selections
  const groupName = 'productBoundaryCondition';

  if (event) {
    const selectedControl = this.formService.createDynamicFormGroup(option.label, option.type, option);
    this.addControlToGroup(groupName, selectedControl);
  } else {
    this.removeControlFromGroup(groupName, option.label);
  }

  // Update page blank status
  const numberOfFields = Object.keys(this.dynamicForm.controls).length;
  this.isPageBlank = numberOfFields === 0;
}

// Add control to form group using a switch case
addControlToGroup(groupName: string, control: FormGroup) {
  switch (groupName) {
    case 'productBoundaryCondition':
      this.productBoundaryCondition.push(control);
      break;
    case 'PremiumandPaymentDetail':
      this.PremiumandPaymentDetail.push(control);
      break;
    case 'productServiceNonfinancialAlterations':  
      this.productServiceNonfinancialAlterations.push(control);
      break;
    case 'featreandReinsate':
      this.featreandReinsate.push(control);
      break;
    case 'productServicingAlteration':
      this.productServicingAlteration.push(control);
      break;
    case 'terminationCancellation':
      this.terminationCancellation.push(control);
      break;
    case 'defaultGroup':
    default:
      this.dynamicForm.addControl(control.get('label')?.value, control);
      break;
  }
}

// Remove control from form group using a switch case
removeControlFromGroup(groupName: string, label: string) {
  switch (groupName) {
    case 'productBoundaryCondition': {
      const index = this.findOptionIndex(label, 'productBoundaryCondition');
      if (index > -1) this.productBoundaryCondition.removeAt(index);
      break;
    }
    case 'PremiumandPaymentDetail': {
      const index = this.findOptionIndex(label, 'PremiumandPaymentDetail');
      if (index > -1) this.PremiumandPaymentDetail.removeAt(index);
      break;
    }
    case 'productServiceNonfinancialAlterations': {
      const index = this.findOptionIndex(label, 'productServiceNonfinancialAlterations');
      if (index > -1) this.productServiceNonfinancialAlterations.removeAt(index);
      break;
    }
    case 'featreandReinsate': {
      const index = this.findOptionIndex(label, 'featreandReinsate');
      if (index > -1) this.featreandReinsate.removeAt(index);
      break;
    }
    case 'productServicingAlteration': {
      const index = this.findOptionIndex(label, 'productServicingAlteration');
      if (index > -1) this.productServicingAlteration.removeAt(index);
      break;
    }
    case 'terminationCancellation': {
      const index = this.findOptionIndex(label, 'terminationCancellation');
      if (index > -1) this.terminationCancellation.removeAt(index);
      break;
    }
    case 'defaultGroup':
    default:
      this.dynamicForm.removeControl(label);
      break;
  }
}

onSingleChange(isChecked: boolean) {
  console.log("onSingleChange called");
  this.isSingleSelected = isChecked;

  if (isChecked) {
    this.selectedFrequency = []; // Clear other frequencies if "Single" is selected
    this.isOtherSelected = false;

    // Add all controls for the group 'productBoundaryCondition'
    this.addAllControlsForGroup('productBoundaryCondition', true);
  } else {
    // Remove all controls for 'productBoundaryCondition' if "Single" is unchecked
    this.addAllControlsForGroup('productBoundaryCondition', false);
  }

  this.updateControlsForSingle();
}

onChangeFrequency(option: string) {
  console.log("onChangeFrequency called for option: " + option);
  const index = this.selectedFrequency.indexOf(option);

  if (index === -1) {
    // Option was not previously selected, add it and all controls in 'productBoundaryCondition'
    this.selectedFrequency.push(option);
    this.isOtherSelected = true;

    // Add all controls for the group 'productBoundaryCondition'
    this.addAllControlsForGroup('productBoundaryCondition', true);
  } else {
    // Remove the frequency and check if any others are still selected
    this.selectedFrequency.splice(index, 1);
    if (this.selectedFrequency.length === 0) {
      this.isOtherSelected = false;
    }

    // Remove all controls for 'productBoundaryCondition' if no options are selected
    this.addAllControlsForGroup('productBoundaryCondition', false);
  }

  this.updateControlsForFrequency();
}

addAllControlsForGroup(groupName: string, isAdding: boolean) {
  const groupOptions = this.searchFilterList.filter(option => option.group === groupName);

  // Add or remove all controls for the given group
  groupOptions.forEach(option => {
    const optionIndex = this.searchFilterList.indexOf(option);
    this.addRemoveControls(isAdding, option, optionIndex);
  });
}

updateControlsForSingle() {
  if (this.isSingleSelected) {
    console.log("Updating controls for single selection");
    // Additional logic for "Single" if needed
  }
}

updateControlsForFrequency() {
  this.selectedFrequency.forEach(frequency => {
    console.log("Updating controls for frequency: " + frequency);
    // Additional logic for frequency options if needed
  });
}


/////////////////////////
  processComaInput(){
this.numberInputArray = this.commaSeparatedInput
.split(',').map(value=>value.trim()).filter(value=> !isNaN(Number(value)))
 .map(value=> Number(value));
  console.log("here is a number Array"+ this.numberInputArray);
}
  
}
