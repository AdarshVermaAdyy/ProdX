import { CommonModule } from '@angular/common';
import { Component, OnInit ,signal} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLineModule, MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GetSetService } from '../../../../service/get-set.service';
import { MatExpansionModule } from '@angular/material/expansion';
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
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSidenavContainer,
    MatSidenav,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
  MatStepperModule],
  templateUrl: './coverage-info.component.html',
  styleUrl: './coverage-info.component.scss'
})

export class CoverageInfoComponent {
  searchForm: FormGroup;
  coverageInfoForm: FormGroup;
   isBlankTemplete='';
   isPageBlank = true; //

  optionalFieldsList: InputField[] =
  [
    {label: "Coverage Code", formControlName: 'coverageCode', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Name", formControlName: 'cover_name1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Type", formControlName: 'cover_type', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Amount", formControlName: 'coverageAmount', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Term", formControlName: 'coverageTerm', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Efective Date", formControlName: 'coverageEffectiveDate', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Expiry Date", formControlName: 'coverageExpiryDate', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Premium", formControlName: 'coveragePremium', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Waiting Time", formControlName: 'waiting_period', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Coverage Condition", formControlName: 'coverage_condition', type: 'text', isVisible: false, category: 'basicInformation'},

    {label: "Coverage Structure", formControlName: 'coverage_struc', type: 'text', isVisible: false, category: 'coverage_struc'},
    {label: "Beneficiary Category", formControlName: 'Beneficiary', type: 'text', isVisible: false, category: 'coverage_struc'},
    {label: "Supplemental Death Benefit", formControlName: 'Death_benefit', type: 'text', isVisible: false, category: 'coverage_struc'},

  ]

  // filteredFields = this.optionalFieldsList;
  readonly panelOpenState = signal(true);
  searchFilterList = this.optionalFieldsList;
  templeteFeilds=[
      'coverageCode',
      'cover_name1',
      'cover_type' ,
      'coverageAmount',
      'coverageTerm',
      'coverageEffectiveDate',
      'coverageExpiryDate',
      'coveragePremium',
      'waiting_period',
      'coverage_condition',


  ]

  constructor(private _fb: FormBuilder,private getSetService: GetSetService) {
    this.coverageInfoForm = new FormGroup({});
    this.isBlankTemplete = localStorage.getItem('createMode');
  }

  ngOnInit(): void {
    this.initialiseForm();
this.initializeSearchForm();
if(this.isBlankTemplete === 'create-by-template'){
      this.optionalFieldsList.forEach(feild=>{
        const isFeildExist = this.templeteFeilds.some(tempFeild => feild.formControlName === tempFeild);
        if(isFeildExist){
          this.addRemoveControls(true,feild)
        }
      })
    }
  }


  initialiseForm(){
    this.coverageInfoForm = this._fb.group({
      // coverageCode: new FormControl('',[Validators.required]),
      // cover_name1: new FormControl('',[Validators.required]),
      // cover_type: new FormControl('',[Validators.required]),
      // coverageAmount: new FormControl('',[Validators.required]),
      // coverageTerm: new FormControl('',[Validators.required]),
      // coverageEffectiveDate:new FormControl('',[Validators.required]),
      // coverageExpiryDate:new FormControl('',[Validators.required]),
      // coveragePremium: new FormControl('',[Validators.required]),
      // waiting_period: new FormControl('',[Validators.required]),
      // coverage_condition:new FormControl(''),
      // Death_benefit:new FormControl('')

    })
  }
  initializeSearchForm(){
    this.searchForm = this._fb.group({
      search: ['']
    });
  }
  // applyFilter(searchTerm) {
  //   this.filteredFields = this.optionalFieldsList.filter(field =>
  //     field.label.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // }

  search(event){

    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.optionalFieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
  console.log("filter",this.searchFilterList)
  }

  cancelSearch(){
    this.searchForm.reset();
    this.searchFilterList = this.optionalFieldsList;
  }



  //getters
  get coverageCode(){
    return this.coverageInfoForm.get('coverageCode');
  }
  get cover_name1(){
    return this.coverageInfoForm.get('cover_name1');
  }
  get cover_type(){
    return this.coverageInfoForm.get('cover_type');
  }
  get coverageAmount(){
    return this.coverageInfoForm.get('coverageAmount');
  }
  get coverageTerm(){
    return this.coverageInfoForm.get('coverageTerm');
  }
  get coverageEffectiveDate(){
    return this.coverageInfoForm.get('coverageEffectiveDate');
  }
  get coverageExpiryDate(){
    return this.coverageInfoForm.get('coverageExpiryDate');
  }
  get coveragePremium(){
    return this.coverageInfoForm.get('coveragePremium');
  }
  get waiting_period(){
    return this.coverageInfoForm.get('waiting_period');
  }
  get coverage_condition(){
    return this.coverageInfoForm.get('coverage_condition');
  }

  get coverage_struc(){
    return this.coverageInfoForm.get('coverage_struc');
  }
  get Beneficiary(){
    return this.coverageInfoForm.get('Beneficiary');
  }
  get Death_benefit(){
    return this.coverageInfoForm.get('Death_benefit');
  }
  get underwritingGuidelines(){
    return this.coverageInfoForm.get('underwritingGuidelines');
  }
  get underwritingRequirements(){
    return this.coverageInfoForm.get('underwritingRequirements');
  }
  get riskAssessCriteria(){
    return this.coverageInfoForm.get('riskAssessCriteria');
  }
  get refundablePrem(){
    return this.coverageInfoForm.get('refundablePrem');
  }
  get taxBenefits(){
    return this.coverageInfoForm.get('taxBenefits');
  }
  get renewal(){
    return this.coverageInfoForm.get('renewal');
  }

  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      this.coverageInfoForm.addControl(field.formControlName, new FormControl('', [Validators.required]));
    } else {
      this.coverageInfoForm.removeControl(field.formControlName);
    }
    const numberOfFields = Object.keys(this.coverageInfoForm.controls).length;
    if(numberOfFields > 0){
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
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
