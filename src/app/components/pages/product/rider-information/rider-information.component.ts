import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { GetSetService } from '../../../../service/get-set.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
import { EditLabelComponent } from '../../../../shared/edit-label/edit-label.component';
import { Subscription } from 'rxjs';
import { FormDataService } from '../../../../service/form-data.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
interface InputField {
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox';
  options?: Options[] | [];
  isVisible?: boolean;
  isMandatory: boolean;
  category: string;
  defaultVal: any;
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
    MatStepperModule,
    MatTooltipModule,
  ],
  templateUrl: './rider-information.component.html',
  styleUrl: './rider-information.component.scss',
})
export class RiderInformationComponent implements OnInit {
  riderDetailsForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  readonly panelOpenState = signal(true);
  private formService$ = new Subscription();
  @Input() productData!: any;
  @Input() mode!: string;
  commentColor = 'green';

  fieldsList: InputField[] = [
    {
      label: 'Rider Code 1',
      formControlName: 'ridercode1',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'RID-01',
    },
    {
      label: 'Rider Name 1',
      formControlName: 'riderName1',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'Spouse Coverage Rider',
    },
    {
      label: 'Rider Option ',
      formControlName: 'riderOption',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'Mandatory',
    },
    {
      label: 'Rider Type',
      formControlName: 'riderTpye',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'active',
    },
    {
      label: 'Rider Coverage Amount',
      formControlName: 'riderCoverAmount',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '2000',
    },
    {
      label: 'Rider Term',
      formControlName: 'riderTerm',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '50,000',
    },
    {
      label: 'Rider Effective Date',
      formControlName: 'riderEffectiveDate',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '9/5/2024',
    },
    {
      label: 'Rider Expiry Date',
      formControlName: 'riderExpiryDate',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '9/15/2024',
    },
    {
      label: 'Rider Premium',
      formControlName: 'riderPremium',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '12721',
    },
    {
      label: 'Rider Wait Period',
      formControlName: 'riderWaitPeriod',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'active',
    },
    {
      label: 'Rider Renewal Option',
      formControlName: 'riderRenewal',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'yes',
    },
    {
      label: 'Rider Conversion Option',
      formControlName: 'ridersCoverOption',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: 'yes',
    },
    {
      label: 'Rider Condition',
      formControlName: 'riderCondition',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal:
        'Covers spouse only if they are listed as a beneficiary on the policy.',
    },
    {
      label: 'Min Age',
      formControlName: 'min',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '18',
    },
    {
      label: 'Max Age',
      formControlName: 'max',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal: '80',
    },
    {
      label: 'Rider Benefits',
      formControlName: 'rider_benefits',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal:
        'Provides an additional coverage amount equal to the sum assured of the base policy in case of accidental death of the spouse.',
    },
    {
      label: 'Rider Limitation',
      formControlName: 'rider_limitation',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal:
        'Excludes coverage for pre-existing medical conditions of the spouse.',
    },
    {
      label: 'Rider Cancellation Term',
      formControlName: 'rider_cancellation_term',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'basicInformation',
      defaultVal:
        'Can be canceled within 30 days of purchase without penalty; after 30 days, cancellation is subject to a 10% penalty',
    },

    {
      label: 'Rider Age Restriction',
      formControlName: 'rider_age_res',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Coverage Info',
      defaultVal: 'No',
    },
    {
      label: 'Rider Coverage Trigger',
      formControlName: 'rider_cover_trigger',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Coverage Info',
      defaultVal: 'No',
    },
    {
      label: 'Rider Coverage Reductions',
      formControlName: 'rider_cover_red',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Coverage Info',
      defaultVal: '87283',
    },
    {
      label: 'Rider Payment Frequency',
      formControlName: 'rider_payout_freq',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Payout Frequency',
      defaultVal: 'Monthly',
    },
    {
      label: 'Rider Premium Waiver Clause',
      formControlName: 'rider_prem_waiver',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Payout Frequency',
      defaultVal: '2342',
    },
    {
      label: 'Rider Automatic Increase',
      formControlName: 'rider_auto_inc',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Payout Frequency',
      defaultVal: '12721',
    },
    {
      label: 'Rider Settlement Options',
      formControlName: 'rider_settle_option',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Payout Frequency',
      defaultVal: '8272',
    },
    {
      label: 'Rider Contribution Type',
      formControlName: 'rider_contri_type',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Rider Payout Frequency',
      defaultVal: '12721',
    },
  ];

  searchFilterList = [];
  groupCategoryList: { [key: string]: any[] } = {};
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
    'min',
    'max',
    'rider_benefits',
    'rider_limitation',
    'rider_cancellation_term',
  ];

  riderInfoData;
  templateName;

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private shareproductData: ShareproductdataService,
    private getSetService: GetSetService,
    private formDataService: FormDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.riderDetailsForm = new FormGroup({});
    this.isBlankTemplate = localStorage.getItem('createMode');
  }

  ngOnInit(): void {
    if (this.router.url.includes('edit-product')) {
      this.activatedRoute.params.subscribe((param) => {
        this.templateName = param['name'];
      });
      const draftsData = JSON.parse(localStorage.getItem('myDrafts'));

      const template = draftsData.filter(
        (x) => x?.draftName == this.templateName
      );

      this.riderInfoData = template[0]?.data?.['rider-info'];

      this.templateFields = Object.keys(this.riderInfoData);
    }

    this.initialiseForm();
    this.initializeSearchForm();
    this.formService$ = this.formDataService.callSaveFunction$.subscribe(
      (data) => {
        if (data === '3') {
          this.saveData();
        }
      }
    );
    this.generateFormFeilds();
    this.groupFieldsByCategory();
  }

  initializeSearchForm() {
    this.searchForm = this._fb.group({
      search: [''],
    });
  }

  initialiseForm() {
    this.riderDetailsForm = this._fb.group({});
  }

  //getters
  get productCode() {
    return this.riderDetailsForm.get('productCode');
  }
  get riderCoverAmount() {
    return this.riderDetailsForm.get('riderCoverAmount');
  }
  get riderTerm() {
    return this.riderDetailsForm.get('riderTerm');
  }
  get riderEffectiveDate() {
    return this.riderDetailsForm.get('riderEffectiveDate');
  }
  get riderExpiryDate() {
    return this.riderDetailsForm.get('riderExpiryDate');
  }
  get riderPremium() {
    return this.riderDetailsForm.get('riderPremium');
  }
  get riderWaitPeriod() {
    return this.riderDetailsForm.get('riderWaitPeriod');
  }
  get riderRenewal() {
    return this.riderDetailsForm.get('riderRenewal');
  }
  get ridersCoverOption() {
    return this.riderDetailsForm.get('ridersCoverOption');
  }
  get riderRadio1() {
    return this.riderDetailsForm.get('riderRadio1');
  }
  get riderCondition() {
    return this.riderDetailsForm.get('riderCondition');
  }
  get min() {
    return this.riderDetailsForm.get('min');
  }
  get max() {
    return this.riderDetailsForm.get('max');
  }
  get rider_benefits() {
    return this.riderDetailsForm.get('rider_benefits');
  }
  get ridercode1() {
    return this.riderDetailsForm.get('ridercode1');
  }
  get riderName1() {
    return this.riderDetailsForm.get('riderName1');
  }
  get riderOption() {
    return this.riderDetailsForm.get('riderOption');
  }
  get riderTpye() {
    return this.riderDetailsForm.get('riderTpye');
  }
  get rider_limitation() {
    return this.riderDetailsForm.get('rider_limitation');
  }
  get riskAssessCriteria() {
    return this.riderDetailsForm.get('riskAssessCriteria');
  }
  get refundablePrem() {
    return this.riderDetailsForm.get('refundablePrem');
  }
  get taxBenefits() {
    return this.riderDetailsForm.get('taxBenefits');
  }
  get renewal() {
    return this.riderDetailsForm.get('renewal');
  }
  get rider_cancellation_term() {
    return this.riderDetailsForm.get('rider_cancellation_term');
  }
  get rider_payout_freq() {
    return this.riderDetailsForm.get('rider_payout_freq');
  }
  get rider_cover_red() {
    return this.riderDetailsForm.get('rider_cover_red');
  }
  get rider_cover_trigger() {
    return this.riderDetailsForm.get('rider_cover_trigger');
  }
  get rider_age_res() {
    return this.riderDetailsForm.get('rider_age_res');
  }
  get rider_prem_waiver() {
    return this.riderDetailsForm.get('rider_prem_waiver');
  }
  get rider_auto_inc() {
    return this.riderDetailsForm.get('rider_auto_inc');
  }
  get rider_settle_option() {
    return this.riderDetailsForm.get('rider_settle_option');
  }
  get rider_contri_type() {
    return this.riderDetailsForm.get('rider_contri_type');
  }

  groupFieldsByCategory() {
    this.searchFilterList.forEach((item) => {
      if (!this.groupCategoryList[item.category]) {
        this.groupCategoryList[item.category] = [];
      }
      this.groupCategoryList[item.category].push(item);
    });
  }
  addRemoveControls(
    event: any,
    field: InputField,
    action = 'function',
    index?
  ) {
    field.isVisible = event;
    if (event) {
      this.riderDetailsForm.addControl(
        field.formControlName,
        new FormControl(
          field.defaultVal || '',
          field.isMandatory ? Validators.required : []
        )
      );
      if (action === 'checkbox') {
        this.groupCategoryList[field.category].splice(index, 1);
        if (this.groupCategoryList[field.category].length === 0) {
          delete this.groupCategoryList[field.category];
        }
      }
    } else {
      this.riderDetailsForm.removeControl(field.formControlName);
    }

    const numberOfFields = Object.keys(this.riderDetailsForm.controls).length;
    if (numberOfFields > 0) {
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
  }

  generateFormFeilds() {
    if (this.isBlankTemplate === 'create-by-template') {
      //this.searchFilterList = this.fieldsList.filter(field => !this.templateFields.some(item => item === field.formControlName))

      this.fieldsList.forEach((field) => {
        // this.searchFilterList = this.fieldsList.filter(field => !this.templateFields.some(item => item === field.formControlName));
        if (this.mode.includes('edit-draft')) {
          this.templateFields = Object.keys(this.productData);
          field.defaultVal = this.productData[field.formControlName];
        }
        const isFieldExits = this.templateFields.some(
          (tempField) => field.formControlName === tempField
        );
        if (isFieldExits) {
          this.addRemoveControls(true, field);
        }
      });
      this.searchFilterList = this.fieldsList.filter(
        (field) =>
          !this.templateFields.some((item) => item === field.formControlName)
      );
    } else {
      // Taking all fields
      this.searchFilterList = this.fieldsList;
    }
  }

  selectUnselectGroup(event, category) {
    const relFields = this.fieldsList.filter(
      (item) => item.category === category
    );
    if (event.checked) {
      relFields.forEach((item) => {
        this.addRemoveControls(true, item, 'checkbox');
      });
    } else {
      relFields.forEach((item) => {
        this.addRemoveControls(false, item);
      });
    }
  }
  saveData() {
    this.formDataService.setFormData('riderinfo', this.riderDetailsForm.value);
  }

  nextdata() {
    this.saveData();

    console.log('next method called');
    //const data = 'Hello from form details';
    //  this.shareproductData.updateData(data);

    this.shareproductData.updateData(this.riderDetailsForm.value.productCode);
  }

  search(event) {
    const value = event.target.value.toLocaleLowerCase();

    this.searchFilterList = this.fieldsList.filter((field) =>
      field.label.toLocaleLowerCase().includes(value)
    );
    console.log('filters', this.searchFilterList);
  }

  cancelSearch() {
    this.searchForm.reset();
    if (this.isBlankTemplate === 'create-by-template') {
      this.searchFilterList = this.fieldsList.filter(
        (field) =>
          !this.templateFields.some((item) => item === field.formControlName)
      );
    } else {
      this.searchFilterList = this.fieldsList;
    }
  }

  editlabel(controlname) {
    console.log(controlname);
    const dialogRef = this.dialog.open(EditLabelComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const element = controlname + '_label';
      document.getElementById(element).innerHTML = result;
    });
  }

  ngOnDestroy(): void {
    this.formService$.unsubscribe();
  }

  deleteControl(field) {
    this.addRemoveControls(false, field);
    if (!this.groupCategoryList[field.category]) {
      this.groupCategoryList[field.category] = [];
    }
    this.groupCategoryList[field.category].push(field);
  }

  openCommentDialog(controlName, event?): void {
    if (event) {
      event.stopPropagation();
    }
    const index = this.fieldsList.findIndex(
      (x) => x.formControlName == controlName
    );
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '500px',
      disableClose: true,
      data: {
        comment: this.fieldsList[index].hasOwnProperty('comments')
          ? this.fieldsList[index]['comments']
          : '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != 'cancel' && result != '') {
        if (index != -1) {
          this.fieldsList[index]['comments'] = result;
        }
      } else if (
        result == '' &&
        this.fieldsList[index].hasOwnProperty('comments')
      ) {
        delete this.fieldsList[index]['comments'];
      }
    });
  }
}
