import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatDialogModule
  ],
  providers: [
    
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  productDetailsForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  readonly panelOpenState = signal(true);

  fieldsList: InputField[] = [
    {label: "Product Name", formControlName: 'productName', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Product Description", formControlName: 'productDescription', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Product Tageline", formControlName: 'productTagline', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Product Code", formControlName: 'productCode', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Product Status", formControlName: 'productStatus', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Category", formControlName: 'category', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Code 1", formControlName: 'coverageCode1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Name 1", formControlName: 'coverageName1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Code 2", formControlName: 'coverageCode2', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Name 2", formControlName: 'coverageName2', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Riders Applicable", formControlName: 'ridersApplicable', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider 1", formControlName: 'riderCheckbox1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider 2", formControlName: 'riderCheckbox2', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Underwriting Guideline", formControlName: 'underwritingGuidelines', type: 'text', isVisible: false, category: 'underwritingGuidelines'},
    {label: "Underwriting Requirements", formControlName: 'underwritingRequirements', type: 'text', isVisible: false, category: 'underwritingGuidelines'},
    {label: "Risk Assessment Criteria", formControlName: 'riskAssessCriteria', type: 'text', isVisible: false, category: 'underwritingGuidelines'},
    {label: "Refundable Premium", formControlName: 'refundablePrem', type: 'text', isVisible: false, category: 'refundablePrem'},
    {label: "Tax Benefits", formControlName: 'taxBenefits', type: 'text', isVisible: false, category: 'refundablePrem'},
    {label: "Renewal", formControlName: 'renewal', type: 'text', isVisible: false, category: 'refundablePrem'},
  ]

  searchFilterList = this.fieldsList;

  templateFields = [
    'productCode',
    'productStatus',
    'category',
    'coverageCode1',
    'coverageName1',
    'coverageCode2',
    'coverageName2',
    'ridersApplicable',
    'riderCheckbox1',
    'riderCheckbox2',
  ]

  constructor(
    private _fb: FormBuilder,
    private dialog : MatDialog,
    private shareproductData:ShareproductdataService,
    private getSetService: GetSetService
  ) {
    this.productDetailsForm = new FormGroup({});
    this.isBlankTemplate = this.getSetService.get('createMode');
  }

  ngOnInit(): void {
    this.initialiseForm();
    this.initializeSearchForm();
    if(this.isBlankTemplate === 'create-by-template'){
      this.fieldsList.forEach(field => {
        const isFieldExits = this.templateFields.some(tempField => field.formControlName === tempField);
        if(isFieldExits){
          this.addRemoveControls(true, field)
        }
      })
    }
  }

  initializeSearchForm(){
    this.searchForm = this._fb.group({
      search: ['']
    });
  }

  initialiseForm(){
    this.productDetailsForm = this._fb.group({
      // productCode: new FormControl('',[Validators.required]),
      // productStatus: new FormControl('',[Validators.required]),
      // category: new FormControl('',[Validators.required]),
      // coverageCode1: new FormControl('',[Validators.required]),
      // coverageName1: new FormControl('',[Validators.required]),
      // coverageCode2:new FormControl('',[Validators.required]),
      // coverageName2:new FormControl('',[Validators.required]),
      // ridersApplicable: new FormControl('yes',[Validators.required]),
      // riderCheckbox1:new FormControl(''),
      // riderRadio1:new FormControl(''),
      // riderCheckbox2: new FormControl(''),
      // riderRadio2: new FormControl('')
    })
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
  get coverageCode1(){
    return this.productDetailsForm.get('coverageCode1');
  }
  get coverageName1(){
    return this.productDetailsForm.get('coverageName1');
  }
  get coverageCode2(){
    return this.productDetailsForm.get('coverageCode2');
  }
  get coverageName2(){
    return this.productDetailsForm.get('coverageName2');
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
  
  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      this.productDetailsForm.addControl(field.formControlName, new FormControl('', [Validators.required]));
    } else {
      this.productDetailsForm.removeControl(field.formControlName);
    }
 
    const numberOfFields = Object.keys(this.productDetailsForm.controls).length;
    if(numberOfFields > 0){
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
  }

  selectUnselectGroup(event, field){
    const relFields = this.fieldsList.filter(item => item.category === field.category);
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

  nextdata(){
    console.log("next method called");
    const data = 'Hello from form details';
  //  this.shareproductData.updateData(data);
    this.shareproductData.updateData(this.productDetailsForm.value.productCode);
  }

  search(event){
    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.fieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
  }

  cancelSearch(){
    this.searchForm.reset();
    this.searchFilterList = this.fieldsList;
  }
  
  editlabel(controlname){
    console.log(controlname)
    const dialogRef = this.dialog.open(EditLabelComponent);
    dialogRef.afterClosed().subscribe(result => {
    
      const element = controlname+'_label'
      document.getElementById(element).innerHTML = result
    });
  }

}
