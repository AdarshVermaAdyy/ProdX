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
  //formValue = 'templatated';
  isTeamplateValue = 'true';
  searchForm: FormGroup;
//  searchFilterList : any;
optionalFieldsList = [
  { id: 1, label: "Entity Age", type: "range", min: 18, max: 65, group: 'productBoundaryCondition' , selected:false},
{ id: 2, label: "Maturity Age", type: "range", min: 28, max: 65, group: 'productBoundaryCondition', selected:false },
{ id: 3, label: "Premium", type: "range", min: 1500, max: 300000, group: 'productBoundaryCondition', selected:false },
{ id: 4, label: "Premium Payment Type", type: 'radio', options: ['Regular', 'Limited'], group: 'productBoundaryCondition', selected:false },
{ id: 5, label: "Premium Payment Frequency", type: 'dropdown', options: ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'], group: 'productBoundaryCondition', selected:false},
{ id: 6, label: "PT (In Year)", type: 'dropdown', options: ['5','10', '15', '20'], group: 'productBoundaryCondition', selected:false },
{ id: 7, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
{ id: 8, label: "PT (In Year)", type: 'dropdown', options: ['10', '20', '30'], group: 'productBoundaryCondition', selected:false },
{ id: 9, label: "Sum Assured", type: "range", min: 100000, max: 300000, group: 'productBoundaryCondition', selected:false },
{ id: 10, label: "Add PPT Combination (In Year)", type: 'dropdown', options: ['5','7', '10', '12', '13'], group: 'productBoundaryCondition' , selected:false},
// { id: 5, label: "Gender", type: 'dropdown', options: ['Male', 'Female', 'Other'], group: 'productBoundaryCondition' },
// { id: 6, label: "Username", type: "text", value: "ahakal", group: 'productBoundaryCondition' },
{ id: 11, label: "Grace Period", type: 'dropdown', options: ['15', '30', '60'], group: 'productBoundaryCondition' , selected:false},
{ id: 12, label: "BackDating", type: 'dropdown', options: ['Yes', 'No'], group: 'productBoundaryCondition', selected:false },


{ id: 13, label: "Change of Name", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' ,  selected:false},
{ id: 14, label: "Appointee Change", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails'  , selected:false},
{ id: 15, label: "Letters", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails',  selected:false },
{ id: 16, label: "Nach Registration", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 17, label: "Change of Owner", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 18, label: "Change of Nominee", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 19, label: "Assignment/Reassignment", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 20, label: "Change of Address", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 21, label: "Change of Freq", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 22, label: "Change of Contact Details", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 23, label: "Change in PAN", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 24, label: "Duplicate policy Number", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 25, label: "EIA", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 26, label: "Change in Occupation", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 27, label: "Change of PEP", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 28, label: "Change in UID", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails' , selected:false},
{ id: 29, label: "Certification of Existance", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false },
{ id: 30, label: "Policy Search UI", type: 'dropdown', options: ['Yes', 'No'], group: 'premiumDetails', selected:false},

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
searchResults:any;


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

  get premiumDetails(): FormArray {
    return this.dynamicForm.get('selectedValues.premiumDetails') as FormArray;
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

  isProducBoundarySelect(): boolean {
    const productBoundaryselect = this.dynamicForm.get(`selectedValues.productBoundary`) as FormArray;
    return productBoundaryselect.controls.some(control => control.get('value')?.value);
  }
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
    const productServicNonoFinancialAleration = this.dynamicForm.get(`selectedValues.premiumDetails`) as FormArray;
    return productServicNonoFinancialAleration.controls.some(control => control.get('value')?.value);
  }

  isproductBoundaryCondition(): boolean {
    const productBoundaryConditionValues = this.dynamicForm.get(`selectedValues.productBoundaryCondition`) as FormArray;
    return productBoundaryConditionValues.controls.some(control => control.get('value')?.value);
  }
  
  onSubmit() {
   
    if (this.dynamicForm.invalid) {
     
      this.markAllAsTouched();
    } else {
      this.isSubmitted = true;
    
    }
  }
  next() {
    console.log("Next click");
  }

  markAllAsTouched() {
    this.productBoundaryCondition.controls.forEach(control => control.markAsTouched());
    this.premiumDetails.controls.forEach(control => control.markAsTouched());
    this.featreandReinsate.controls.forEach(control => control.markAsTouched());
    this.productServicingAlteration.controls.forEach(control => control.markAsTouched());
    this.terminationCancellation.controls.forEach(control => control.markAsTouched());
    this.productBoundary.controls.forEach(control => control.markAsTouched());
    this.PremiumandPaymentDetail.controls.forEach(control => control.markAsTouched());
  }
  toggleSelectAll(event, group, i: any) {
    const relFields = this.optionalFieldsList.filter(item => item.group === group);
     console.log("toggleSelectAll.."+ group +" "+ event.checked + i );   
    if (event.checked) {
      relFields.forEach((item, index) => {
        const actualIndex = this.optionalFieldsList.indexOf(item);
        this.addRemoveControls(true, item, actualIndex);
      })
    } else {
      relFields.forEach(item => {
        const actualIndex = this.optionalFieldsList.indexOf(item);
        this.addRemoveControls(false, item, actualIndex);

      })
    }
  }
  addRemoveControls(event: any, field: any, i) {
    
     field.selected = event;
   
    const option = this.optionalFieldsList[i];

    if (event) {
      const selectedGroup = this.formService.createDynamicFormGroup(option.label, option.type, option);
               console.log("addcOntrol Group ..." + JSON.stringify(option.group + " " + option.label));
      if (option.group === 'productBoundaryCondition') {
          console.log("Phushing Product Boundary Condition..." + JSON.stringify(option.label));
        this.productBoundaryCondition.push(selectedGroup);

      } else if (option.group === 'premiumDetails') {
        this.premiumDetails.push(selectedGroup);
      }
      else if (option.group === 'featreandReinsate') {
        this.featreandReinsate.push(selectedGroup);
      }
      else if (option.group === 'productServicingAlteration') {
        this.productServicingAlteration.push(selectedGroup);
      }
      else if (option.group === 'terminationCancellation') {
        this.terminationCancellation.push(selectedGroup);
      }
      else if (option.group === 'productBoundary') {
        this.isProductBoundarySelected = true;
        this.productBoundary.push(selectedGroup);
      }
      
      else if (option.group === 'PremiumandPaymentDetail') {
        this.isPremiumandPaymentDetail = true;
        this.PremiumandPaymentDetail.push(selectedGroup);
      }

    } else {

      const selectedIndex = this.findOptionIndex(option.label, option.group);
      if (selectedIndex > -1) {
        if (option.group === 'productBoundaryCondition') {
          this.productBoundaryCondition.removeAt(selectedIndex);
        } else if (option.group === 'premiumDetails') {
          this.premiumDetails.removeAt(selectedIndex);
        }
        else if (option.group === 'featreandReinsate') {
          this.featreandReinsate.removeAt(selectedIndex);
        }
        else if (option.group === 'productServicingAlteration') {
          this.productServicingAlteration.removeAt(selectedIndex);
        }
        else if (option.group === 'terminationCancellation') {
          this.terminationCancellation.removeAt(selectedIndex);
        }
        else if (option.group === 'productBoundary') {
          // this.isProductBoundarySelected = false;
          this.productBoundary.removeAt(selectedIndex);
        }
        else if (option.group === 'PremiumandPaymentDetail') {
          // this.isProductBoundarySelected = false;
          this.PremiumandPaymentDetail.removeAt(selectedIndex);
        }
      }
    }
    const numberOfFields = Object.keys(this.dynamicForm.controls).length;
    console.log("here is form length.."+ numberOfFields);
    if(numberOfFields > 0){
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }

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
    this.searchFilterList = this.optionalFieldsList.filter(field => {
    return   field.label.toLocaleLowerCase().includes(value) 
    });
    
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
  
  
}
