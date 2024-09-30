import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLineModule, MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GetSetService } from '../../../../service/get-set.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormDataService } from '../../../../service/form-data.service';
import { Subscription } from 'rxjs';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
interface InputField {
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox';
  options?: Options[] | [];
  isVisible?: boolean,
  isMandatory:boolean;
  category: string,
  defaultVal?: any
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

export class CoverageInfoComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  coverageInfoForm: FormGroup;
  isBlankTemplete = '';
  isPageBlank = true; //
  private formService$ = new Subscription();
  @Input() productData!: any;
  @Input() mode!: string;

  optionalFieldsList: InputField[] =
  [
    {label: "Coverage Code", formControlName: 'coverageCode', type: 'text', isVisible: false, isMandatory: false, category: 'basicInformation',defaultVal: 'N18A'},
    {label: "Coverage Name", formControlName: 'cover_name1', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: 'Pure Protection RP-V01'},
    {label: "Coverage Type", formControlName: 'cover_type', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: 'Death_benefits'},
    {label: "Min Age", formControlName: 'min', type: 'text', isVisible: false, isMandatory: false,category: 'basicInformation',defaultVal: '18'},
    {label: "Max Age", formControlName: 'max', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: '75'},
    {label: "Coverage Amount", formControlName: 'coverageAmount', type: 'text', isVisible: false, isMandatory: false,category: 'basicInformation',defaultVal: '500000'},
    {label: "Coverage Term", formControlName: 'coverageTerm', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: '15 years'},
    {label: "Coverage Efective Date", formControlName: 'coverageEffectiveDate', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: '12/09/2024'},
    {label: "Coverage Expiry Date", formControlName: 'coverageExpiryDate', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: '9/13/2024'},
    {label: "Coverage Premium", formControlName: 'coveragePremium', type: 'text', isVisible: false, isMandatory: false,category: 'basicInformation',defaultVal: '500'},
    {label: "Waiting Time", formControlName: 'waiting_period', type: 'text', isVisible: false,isMandatory: false, category: 'basicInformation',defaultVal: '90'},
    {label: "Coverage Condition", formControlName: 'coverage_condition', type: 'text', isVisible: false, isMandatory: false,category: 'basicInformation',defaultVal: 'If the insured dies in a car accident on 15th June 2024 and the death occurs within 180 days due to injuries from that accident, the Accidental Death Benefit of ₹50,000 will be payable to the beneficiaries.'},
      { label: "Coverage Structure", formControlName: 'coverage_struc', type: 'text', isVisible: false,isMandatory: false, category: 'Coverage structure' ,defaultVal: 'my cover'},
      { label: "Beneficiary Category", formControlName: 'Beneficiary', type: 'text', isVisible: false,isMandatory: false, category: 'Coverage structure',defaultVal: 'my cover' },
      { label: "Supplemental Death Benefit", formControlName: 'Death_benefit', type: 'text', isVisible: false,isMandatory: false, category: 'Coverage structure',defaultVal: 'my cover' },

    ]

  // filteredFields = this.optionalFieldsList;
  readonly panelOpenState = signal(true);
  searchFilterList = [];
  groupCategoryList: { [key: string]: any[] } = {};
  templeteFeilds=[
      'coverageCode',
      'cover_name1',
      'cover_type' ,
      'min',
      'max',
      'coverageAmount',
      'coverageTerm',
      'coverageEffectiveDate',
      'coverageExpiryDate',
      'coveragePremium',
      'waiting_period',
      'coverage_condition',


  ]

  constructor(private _fb: FormBuilder, private getSetService: GetSetService,private shareproductData: ShareproductdataService, private formDataService: FormDataService) {
    this.coverageInfoForm = new FormGroup({});
    this.isBlankTemplete = localStorage.getItem('createMode');
  }

  ngOnInit(): void {

    this.initialiseForm();
    this.initializeSearchForm();

    this.formService$ = this.formDataService.callSaveFunction$.subscribe(data => {
      if(data === '2'){
        this.saveData();
      }
    })

    this.generateFormFeilds();
  this.groupFieldsByCategory();


  }


  initialiseForm() {
    this.coverageInfoForm = this._fb.group({


    })
  }
  initializeSearchForm() {
    this.searchForm = this._fb.group({
      search: ['']
    });
  }
  // applyFilter(searchTerm) {
  //   this.filteredFields = this.optionalFieldsList.filter(field =>
  //     field.label.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // }

  search(event) {

    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.optionalFieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
    console.log("filter", this.searchFilterList)
  }

  cancelSearch() {
    this.searchForm.reset();
    if(this.isBlankTemplete === 'create-by-template'){
      this.searchFilterList = this.optionalFieldsList.filter(field => !this.templeteFeilds.some(item => item === field.formControlName));
    } else{
    this.searchFilterList = this.optionalFieldsList;
  }}
  generateFormFeilds(){
  if (this.isBlankTemplete === 'create-by-template') {

    // this.searchFilterList = this.optionalFieldsList.filter(field => !this.templeteFeilds.some(item => item === field.formControlName))
        this.optionalFieldsList.forEach(feild => {
          if(this.mode.includes('edit-draft')){
            this.templeteFeilds = Object.keys(this.productData);
            feild.defaultVal = this.productData[feild.formControlName];
          }


          const isFeildExist = this.templeteFeilds.some(tempFeild => feild.formControlName === tempFeild);
          if (isFeildExist) {
            this.addRemoveControls(true, feild)
          }
        });
        this.searchFilterList = this.optionalFieldsList.filter(
          (field) =>
            !this.templeteFeilds.some((item) => item === field.formControlName)
        );
      }else {
        // Taking all fields
        this.searchFilterList = this.optionalFieldsList;
      }
}
  groupFieldsByCategory() {
    this.searchFilterList.forEach(item => {
      if (!this.groupCategoryList[item.category]) {
        this.groupCategoryList[item.category] = [];
      }
      this.groupCategoryList[item.category].push(item);
    });
  }



  //getters
  get coverageCode() {
    return this.coverageInfoForm.get('coverageCode');
  }
  get cover_name1() {
    return this.coverageInfoForm.get('cover_name1');
  }
  get cover_type() {
    return this.coverageInfoForm.get('cover_type');
  }
  get min(){
    return this.coverageInfoForm.get('min')
  }
  get max(){
    return this.coverageInfoForm.get('max')
  }
  get coverageAmount(){
    return this.coverageInfoForm.get('coverageAmount');
  }
  get coverageTerm() {
    return this.coverageInfoForm.get('coverageTerm');
  }
  get coverageEffectiveDate() {
    return this.coverageInfoForm.get('coverageEffectiveDate');
  }
  get coverageExpiryDate() {
    return this.coverageInfoForm.get('coverageExpiryDate');
  }
  get coveragePremium() {
    return this.coverageInfoForm.get('coveragePremium');
  }
  get waiting_period() {
    return this.coverageInfoForm.get('waiting_period');
  }
  get coverage_condition() {
    return this.coverageInfoForm.get('coverage_condition');
  }

  get coverage_struc() {
    return this.coverageInfoForm.get('coverage_struc');
  }
  get Beneficiary() {
    return this.coverageInfoForm.get('Beneficiary');
  }
  get Death_benefit() {
    return this.coverageInfoForm.get('Death_benefit');
  }
  get underwritingGuidelines() {
    return this.coverageInfoForm.get('underwritingGuidelines');
  }
  get underwritingRequirements() {
    return this.coverageInfoForm.get('underwritingRequirements');
  }
  get riskAssessCriteria() {
    return this.coverageInfoForm.get('riskAssessCriteria');
  }
  get refundablePrem() {
    return this.coverageInfoForm.get('refundablePrem');
  }
  get taxBenefits() {
    return this.coverageInfoForm.get('taxBenefits');
  }
  get renewal() {
    return this.coverageInfoForm.get('renewal');
  }

  addRemoveControls(event: any, field: InputField, action = 'function', index?) {
    field.isVisible = event;
    if (event) {
      this.coverageInfoForm.addControl(field.formControlName, new FormControl(field.defaultVal ||'', field.isMandatory ? Validators.required : []));
      if(action === 'checkbox'){
        this.groupCategoryList[field.category].splice(index, 1);
        if(this.groupCategoryList[field.category].length === 0){
          delete this.groupCategoryList[field.category];
        }
      }
    } else {
      this.coverageInfoForm.removeControl(field.formControlName);
    }


    const numberOfFields = Object.keys(this.coverageInfoForm.controls).length;
    if (numberOfFields > 0) {
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
  }

  selectUnselectGroup(event, category) {
    const relFields = this.searchFilterList.filter((item) => item.category === category);
    if (event.checked) {
      relFields.forEach(item => {
        this.addRemoveControls(true, item,'checkbox');
      })
    } else {
      relFields.forEach(item => {
        this.addRemoveControls(false, item);
      })
    }
  }


  saveData(){
    this.formDataService.setFormData('coverageInfo', this.coverageInfoForm.value);
  }

  nextData(){
    this.saveData()
    this.shareproductData.updateData(this.coverageInfoForm.value.productCode);
  }

  ngOnDestroy(): void {
    this.formService$.unsubscribe()
  }
  deleteControl(field) {
    this.addRemoveControls(false, field);
    if(!this.groupCategoryList[field.category]){
      this.groupCategoryList[field.category] = [];
    }
    this.groupCategoryList[field.category].push(field);
  }

}
