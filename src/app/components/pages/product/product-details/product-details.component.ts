import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditLabelComponent } from '../../../../shared/edit-label/edit-label.component';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { GetSetService } from '../../../../service/get-set.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormDataService } from '../../../../service/form-data.service';
import { Subscription } from 'rxjs';

interface InputField{
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox';
  options?: Options[] | [];
  isVisible?: boolean,
  category: string,
  defaultVal?: any
}

interface Options {
  name: string;
  value: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule
  ],
  providers: [

  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

  productDetailsForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  readonly panelOpenState = signal(true);
  private formService$ = new Subscription();

  fieldsList: InputField[] = [
    {label: "Product Name", formControlName: 'productName', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: 'Premium Life Secure Plan'},
    {label: "Product Description", formControlName: 'productDescription', type: 'text', isVisible: false, category: 'basicInformation', defaultVal:'Comprehensive coverage for accidental death and dismemberment'},
    {label: "Product Tageline", formControlName: 'productTagline', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Product Code", formControlName: 'productCode', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: 'PC987654321'},
    {label: "Product Status", formControlName: 'productStatus', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: 'work_in_progress'},
    {label: "Category", formControlName: 'category', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: 'term'},
    {label: "Coverage", formControlName: 'coverage', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Riders Applicable", formControlName: 'ridersApplicable', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: 'yes'},
    {label: "Rider 1", formControlName: 'riderCheckbox1', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: true},
    {label: "Rider 2", formControlName: 'riderCheckbox2', type: 'text', isVisible: false, category: 'basicInformation', defaultVal: false},
    {label: "Underwriting Guideline", formControlName: 'underwritingGuidelines', type: 'text', isVisible: false, category: 'underwritingGuidelines', defaultVal: 'Applicants must be between 18 and 60 years of age, with no pre-existing conditions'},
    {label: "Underwriting Requirements", formControlName: 'underwritingRequirements', type: 'text', isVisible: false, category: 'underwritingGuidelines', defaultVal: ['medical_examination', 'health_questionnaire']},
    {label: "Risk Assessment Criteria", formControlName: 'riskAssessCriteria', type: 'text', isVisible: false, category: 'underwritingGuidelines', defaultVal: 'Includes medical history, lifestyle factors, and occupation'},
    {label: "Refundable Premium", formControlName: 'refundablePrem', type: 'text', isVisible: false, category: 'refundablePrem',defaultVal: 'no'},
    {label: "Tax Benefits", formControlName: 'taxBenefits', type: 'text', isVisible: false, category: 'refundablePrem', defaultVal: 'yes'},
    {label: "Renewal", formControlName: 'renewal', type: 'text', isVisible: false, category: 'refundablePrem', defaultVal: 'automatic'},
  ]

  templateFields = [
    'productCode',
    'productStatus',
    'category',
    'coverage',
    'ridersApplicable',
    'riderCheckbox1',
    'riderCheckbox2',
  ]
  
  searchFilterList = []
  
  constructor(
    private _fb: FormBuilder,
    private dialog : MatDialog,
    private shareproductData:ShareproductdataService,
    private getSetService: GetSetService,
    private formDataService: FormDataService
  ) {
    this.productDetailsForm = new FormGroup({});
    this.isBlankTemplate = localStorage.getItem('createMode');
  }


  ngOnInit(): void {
    this.initialiseForm(); //Initialise the product details form
    this.initializeSearchForm(); //Initialise the search form
    this.formService$ = this.formDataService.callSaveFunction$.subscribe(data => {
      if(data === '0'){
        this.saveData();
      }
    })

    if(this.isBlankTemplate === 'create-by-template'){ // checking if the created from template or from scratch
      // Taking only those fields which are not mandatory
      this.searchFilterList = this.fieldsList.filter(field => !this.templateFields.some(item => item === field.formControlName));
      this.fieldsList.forEach(field => {
        const isFieldExits = this.templateFields.some(tempField => field.formControlName === tempField);
        if(isFieldExits){
          this.addRemoveControls(true, field)
        }
      })
    } else {
      // Taking all fields
      this.searchFilterList = this.fieldsList;
    }
  }

  initializeSearchForm(){
    this.searchForm = this._fb.group({
      search: ['']
    });
  }

  initialiseForm(){
    this.productDetailsForm = this._fb.group({})
  }

  //getters
  get productCode(){
    return this.productDetailsForm.get('productCode');
  }
  get productStatus(){
    return this.productDetailsForm.get('productStatus');
  }
  get category(){
    return this.productDetailsForm.get('category');
  }
  get ridersApplicable(){
    return this.productDetailsForm.get('ridersApplicable');
  }
  get riderCheckbox1(){
    return this.productDetailsForm.get('riderCheckbox1');
  }
  get riderRadio1(){
    return this.productDetailsForm.get('riderRadio1');
  }
  get riderCheckbox2(){
    return this.productDetailsForm.get('riderCheckbox2');
  }
  get riderRadio2(){
    return this.productDetailsForm.get('riderRadio2');
  }
  get productName(){
    return this.productDetailsForm.get('productName');
  }
  get productDescription(){
    return this.productDetailsForm.get('productDescription');
  }
  get productTagline(){
    return this.productDetailsForm.get('productTagline');
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
  get coverage() {
    return this.productDetailsForm?.get('coverage') as FormArray;
  }

  createCoverage(values): FormGroup{
    return this._fb.group({
      coverageCode: [values.coverageCode, [Validators.required]],
      coverageName: [values.coverageName, [Validators.required]]
    })
  }

  addCoverage(values = {coverageCode: '', coverageName: ''}){
    this.coverage?.push(this.createCoverage(values));
  }

  removeCoverage(index: number){
    this.coverage?.removeAt(index)
  }

  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      //creating new fields
      switch(field.formControlName){
        case 'coverage':
          this.productDetailsForm.addControl('coverage', this._fb.array([]));
          this.addCoverage({coverageCode: 'N18A', coverageName: 'Accidental Death Benefit Option'});
          break;
        case 'riderCheckbox1':
          this.productDetailsForm.addControl(field.formControlName, new FormControl(field.defaultVal || ''));
          this.productDetailsForm.addControl('riderRadio1', new FormControl({value:'mandatory', disabled: !this.riderCheckbox1.value}));
          break;
        case 'riderCheckbox2':
          this.productDetailsForm.addControl(field.formControlName, new FormControl(field.defaultVal || ''));
          this.productDetailsForm.addControl('riderRadio2', new FormControl({value:'', disabled: !this.riderCheckbox2.value}));
          break;
        default:
          this.productDetailsForm.addControl(field.formControlName, new FormControl(field.defaultVal || '', [Validators.required]));
      }
    } else {
      switch(field.formControlName){
        case 'riderCheckbox1':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('riderRadio1');
          break;
        case 'riderCheckbox2':
          this.productDetailsForm.removeControl(field.formControlName);
          this.productDetailsForm.removeControl('riderRadio2');
          break;
        default:
          this.productDetailsForm.removeControl(field.formControlName);
      }
    }

    // Check product detail form has any field created
    const numberOfFields = Object.keys(this.productDetailsForm.controls).length;
    if(numberOfFields > 0){
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
  }

  // Add/remove fields on checkout selection
  selectUnselectGroup(event, field){
    const relFields = this.searchFilterList.filter(item => item.category === field.category);
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

  saveData(){
    this.formDataService.setFormData('product-details', this.productDetailsForm.value);
  }

  nextData(){
    this.saveData()
    this.shareproductData.updateData(this.productDetailsForm.value.productCode);
  }

  search(event){
    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.fieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
  }

  cancelSearch(){
    this.searchForm.reset();
    if(this.isBlankTemplate === 'create-by-template'){
      this.searchFilterList = this.fieldsList.filter(field => !this.templateFields.some(item => item === field.formControlName));
    } else {
      this.searchFilterList = this.fieldsList;
    }
  }
  
  editlabel(controlname){
    const dialogRef = this.dialog.open(EditLabelComponent);
    dialogRef.afterClosed().subscribe(result => {
      const element = controlname+'_label'
      document.getElementById(element).innerHTML = result
    });
  }

  riderCheckBox(event, formControlName){
    if(formControlName === 'riderCheckbox1'){
      if(event.checked){
        this.riderRadio1.enable()
        this.riderRadio1.setValidators([Validators.required])
      } else {
        this.riderRadio1.clearValidators()
        this.riderRadio1.disable()
      }
    }

    if(formControlName === 'riderCheckbox2'){
      if(event.checked){
        this.riderRadio2.enable()
        this.riderRadio2.setValidators([Validators.required]);
      } else {
        this.riderRadio2.clearValidators()
        this.riderRadio2.disable()
      }
    }

    this.riderRadio1.updateValueAndValidity();
    this.riderRadio2.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.formService$.unsubscribe()
  }
    
}
