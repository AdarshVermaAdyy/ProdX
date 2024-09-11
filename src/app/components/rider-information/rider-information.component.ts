import { CommonModule } from '@angular/common';
import { Component, OnInit,signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { GetSetService } from '../../service/get-set.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShareproductdataService } from '../../service/shareproductdata.service';
import { EditLabelComponent } from '../../shared/edit-label/edit-label.component';
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
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSidenavContainer,
    MatSidenav,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
  MatStepperModule
  ],
  templateUrl: './rider-information.component.html',
  styleUrl: './rider-information.component.scss'
})

export class RiderInformationComponent implements OnInit {
  riderDetailsForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  readonly panelOpenState = signal(true);

  fieldsList: InputField[] = [
    {label: "Rider Code 1", formControlName: 'ridercode1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Name 1", formControlName: 'riderName1', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Option ", formControlName: 'riderOption', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Type", formControlName: 'riderTpye', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Coverage Amount", formControlName: 'riderCoverAmount', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Term", formControlName: 'riderTerm', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Effective Date", formControlName: 'riderEffectiveDate', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Expiry Date", formControlName: 'riderExpiryDate', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Premium", formControlName: 'riderPremium', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Wait Period", formControlName: 'riderWaitPeriod', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Renewal Option", formControlName: 'riderRenewal', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Conversion Option", formControlName: 'ridersCoverOption', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Condition", formControlName: 'riderCondition', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Benefits", formControlName: 'rider_benefits', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Limitation", formControlName: 'rider_limitation', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Cancellation Term", formControlName: 'rider_cancellation_term', type: 'text', isVisible: false, category: 'basicInformation'},
    {label: "Rider Age Restriction", formControlName: 'rider_age_res', type: 'text', isVisible: false, category: 'rider_age_res'},
    {label: "Rider Coverage Trigger", formControlName: 'rider_cover_trigger', type: 'text', isVisible: false, category: 'rider_age_res'},
    {label: "Rider Coverage Reductions", formControlName: 'rider_cover_red', type: 'text', isVisible: false, category: 'rider_age_res'},
    {label: "Rider Payment Frequency", formControlName: 'rider_payout_freq', type: 'text', isVisible: false, category: 'rider_payout_freq'},
    {label: "Rider Premium Waiver Clause", formControlName: 'rider_prem_waiver', type: 'text', isVisible: false, category: 'rider_payout_freq'},
    {label: "Rider Automatic Increase", formControlName: 'rider_auto_inc', type: 'text', isVisible: false, category: 'rider_payout_freq'},
    {label: "Rider Settlement Options", formControlName: 'rider_settle_option', type: 'text', isVisible: false, category: 'rider_payout_freq'},
    {label: "Rider Contribution Type", formControlName: 'rider_contri_type', type: 'text', isVisible: false, category: 'rider_payout_freq'},
  ]

  searchFilterList = this.fieldsList;

  templateFields = [
    'ridercode1',
    'riderName1',
    'riderOption',
    'riderTpye',
    'riderCoverAmount',
    'riderTerm',
    'riderEffectiveDate',
    'riderExpiryDate',
    'riderPremium',
    'riderWaitPeriod',
    'riderRenewal',
    'ridersCoverOption',
    'riderCondition',
    'rider_benefits',
   'rider_limitation',
   'rider_cancellation_term'
  ]

  constructor(
    private _fb: FormBuilder,
    private dialog : MatDialog,
    private shareproductData:ShareproductdataService,
    private getSetService: GetSetService
  ) {
    this.riderDetailsForm = new FormGroup({});
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
    this.riderDetailsForm = this._fb.group({
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
    return this.riderDetailsForm.get('productCode');
  }
  get riderCoverAmount(){
    return this.riderDetailsForm.get('riderCoverAmount');
  }
  get riderTerm(){
    return this.riderDetailsForm.get('riderTerm');
  }
  get riderEffectiveDate(){
    return this.riderDetailsForm.get('riderEffectiveDate');
  }
  get riderExpiryDate(){
    return this.riderDetailsForm.get('riderExpiryDate');
  }
  get riderPremium(){
    return this.riderDetailsForm.get('riderPremium');
  }
  get riderWaitPeriod(){
    return this.riderDetailsForm.get('riderWaitPeriod');
  }
  get riderRenewal(){
    return this.riderDetailsForm.get('riderRenewal');
  }
  get ridersCoverOption(){
    return this.riderDetailsForm.get('ridersCoverOption');
  }
  get riderRadio1(){
    return this.riderDetailsForm.get('riderRadio1');
  }
  get riderCondition(){
    return this.riderDetailsForm.get('riderCondition');
  }

  get rider_benefits(){
    return this.riderDetailsForm.get('rider_benefits');
  }
  get ridercode1(){
    return this.riderDetailsForm.get('ridercode1');
  }
  get riderName1(){
    return this.riderDetailsForm.get('riderName1');
  }
  get riderOption(){
    return this.riderDetailsForm.get('riderOption');
  }
  get riderTpye(){
    return this.riderDetailsForm.get('riderTpye');
  }
  get rider_limitation(){
    return this.riderDetailsForm.get('rider_limitation');
  }
  get riskAssessCriteria(){
    return this.riderDetailsForm.get('riskAssessCriteria');
  }
  get refundablePrem(){
    return this.riderDetailsForm.get('refundablePrem');
  }
  get taxBenefits(){
    return this.riderDetailsForm.get('taxBenefits');
  }
  get renewal(){
    return this.riderDetailsForm.get('renewal');
  }
  get rider_cancellation_term(){
    return this.riderDetailsForm.get('rider_cancellation_term');
  }
  get rider_payout_freq(){
    return this.riderDetailsForm.get('rider_payout_freq');
  }
  get rider_cover_red(){
    return this.riderDetailsForm.get('rider_cover_red');
  }
  get rider_cover_trigger(){
    return this.riderDetailsForm.get('rider_cover_trigger');
  }
  get rider_age_res(){
    return this.riderDetailsForm.get('rider_age_res');
  }
  get rider_prem_waiver(){
    return this.riderDetailsForm.get('rider_prem_waiver');
  }
  get rider_auto_inc(){
    return this.riderDetailsForm.get('rider_auto_inc');
  }
  get rider_settle_option(){
    return this.riderDetailsForm.get('rider_settle_option');
  }
  get rider_contri_type(){
    return this.riderDetailsForm.get('rider_contri_type');
  }

  addRemoveControls(event: any, field: InputField){
    field.isVisible = event;
    if(event){
      this.riderDetailsForm.addControl(field.formControlName, new FormControl('', [Validators.required]));
    } else {
      this.riderDetailsForm.removeControl(field.formControlName);
    }

    const numberOfFields = Object.keys(this.riderDetailsForm.controls).length;
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

    this.shareproductData.updateData(this.riderDetailsForm.value.riderTpye);
  }

  search(event){
    const value = event.target.value.toLocaleLowerCase();

    this.searchFilterList = this.fieldsList.filter(field => field.label.toLocaleLowerCase().includes(value));
    console.log("filters",this.searchFilterList)

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
