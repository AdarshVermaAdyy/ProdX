import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { ShareproductdataService } from '../../../../service/shareproductdata.service';
import { FormDataService } from '../../../../service/form-data.service';
import { Subscription } from 'rxjs';
import { EditLabelComponent } from '../../../../shared/edit-label/edit-label.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface InputField {
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'radio' | 'checkbox' | 'range';
  options?: Options[] | [];
  isVisible?: boolean;
  isMandatory: boolean;
  category: string;
  defaultVal?: any;
}

interface Options {
  name: string;
  value: string;
}

@Component({
  selector: 'app-product-info',
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
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
})
export class ProductInfoComponent {
  productInfoForm: FormGroup;
  searchForm: FormGroup;
  isBlankTemplate = ''; // if the template is made from Blank template or not
  isPageBlank = true; //
  private formService$ = new Subscription();
  @Input() productData!: any;
  @Input() mode!: string;
  searchFilterList: any = [];
  selectedFrequency: string[] = [];
  isSingleSelected: boolean = false;
  isOtherSelected: boolean = false;
  readonly panelOpenState = signal(true);
  readonly innerPanelOpenState = signal(true);
  templateFields = [
    'changeOfName',
    'appointeeChange',
    'letters',
    'nachRegisteration',
    'changeOfOwner',
    'changeOfNominee',
    'assignment',
    'changeOfAddress',
    'changeOfFrequency',
    'changeOfContact',
    'changeOfPan',
    'duplicatePolicyNumber',
    'eia',
    'changeOfOccupation',
    'changeOfPep',
    'changeOfUid',
    'certificationOfExistance',
    'policySearchUI',
    'lapse',
    'revival',
    'incDecInService',
    'changeOfDob',
    'changeOfGender',
    'changeofPt',
    'changeOfPremium',
    'freeLookPeriodCancell',
    'deathClaim',
    'surrender',
    'maturity',
    'policyCancellation',
  ];
  premiumPaymentFrequencyList: InputField[] = [
    {
      label: 'Min Entity Age',
      type: 'text',
      formControlName: 'minEntityAge',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 18,
    },
    {
      label: 'Max Entity Age',
      type: 'text',
      formControlName: 'maxEntityAge',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 65,
    },
    {
      label: 'Min Maturity Age',
      type: 'text',
      formControlName: 'minMaturityAge',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 25,
    },
    {
      label: 'Max Maturity Age',
      type: 'text',
      formControlName: 'maxMaturityAge',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 65,
    },
    {
      label: 'Min Premium',
      type: 'text',
      formControlName: 'minPremium',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 1500,
    },
    {
      label: 'Max Premium',
      type: 'text',
      formControlName: 'maxPremium',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 10000,
    },
    {
      label: 'Payment Type',
      type: 'radio',
      formControlName: 'paymentType',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 'regular',
    },
    {
      label: 'PT',
      type: 'select',
      formControlName: 'pt',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: '5',
    },
    {
      label: 'PPT',
      type: 'select',
      formControlName: 'ppt',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: '5',
    },
    {
      label: 'Min Sum Assured',
      type: 'text',
      formControlName: 'minSumAssured',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 1500,
    },
    {
      label: 'Max Sum Assured',
      type: 'text',
      formControlName: 'maxSumAssured',
      isVisible: false,
      isMandatory: true,
      category: 'Product Boundary Condition',
      defaultVal: 10000,
    },
    {
      label: 'Grace Period',
      type: 'select',
      formControlName: 'gracePeriod',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: '15',
    },
    {
      label: 'Back Dating',
      type: 'select',
      formControlName: 'backDating',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Gender',
      type: 'select',
      formControlName: 'gender',
      isVisible: false,
      isMandatory: false,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'male',
    },
    {
      label: 'Product Start Date',
      formControlName: 'productStartDate',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: '12/09/2024',
    },
    {
      label: 'Product End Date',
      formControlName: 'productEndDate',
      type: 'text',
      isVisible: false,
      isMandatory: false,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: '12/09/2024',
    },
  ];

  fieldsList: InputField[] = [
    {
      label: 'Change of Name',
      type: 'select',
      formControlName: 'changeOfName',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Appointee Change',
      type: 'select',
      formControlName: 'appointeeChange',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Letters',
      type: 'select',
      formControlName: 'letters',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Nach Registration',
      type: 'select',
      formControlName: 'nachRegisteration',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of Owner',
      type: 'select',
      formControlName: 'changeOfOwner',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of Nominee',
      type: 'select',
      formControlName: 'changeOfNominee',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Assignment/Reassignment',
      type: 'select',
      formControlName: 'assignment',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of Address',
      type: 'select',
      formControlName: 'changeOfAddress',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of Freq',
      type: 'select',
      formControlName: 'changeOfFrequency',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of Contact Details',
      type: 'select',
      formControlName: 'changeOfContact',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change in PAN',
      type: 'select',
      formControlName: 'changeOfPan',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Duplicate policy Number',
      type: 'select',
      formControlName: 'duplicatePolicyNumber',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'EIA',
      type: 'select',
      formControlName: 'eia',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change in Occupation',
      type: 'select',
      formControlName: 'changeOfOccupation',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change of PEP',
      type: 'select',
      formControlName: 'changeOfPep',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Change in UID',
      type: 'select',
      formControlName: 'changeOfUid',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Certification of Existance',
      type: 'select',
      formControlName: 'certificationOfExistance',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Policy Search UI',
      type: 'select',
      formControlName: 'policySearchUI',
      isVisible: false,
      isMandatory: true,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Yes',
    },
    {
      label: 'Lapse',
      type: 'select',
      formControlName: 'lapse',
      isVisible: false,
      isMandatory: true,
      category: 'Forefeature/Reinstatement',
      defaultVal: 'LAPSE30',
    },
    {
      label: 'Revival',
      type: 'select',
      formControlName: 'revival',
      isVisible: false,
      isMandatory: true,
      category: 'Forefeature/Reinstatement',
      defaultVal: 'REVIV30',
    },
    {
      label: 'Increase/Decrease in Service',
      type: 'select',
      formControlName: 'incDecInService',
      isVisible: false,
      isMandatory: true,
      category: 'Product Servicing- Major Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Change of DOB',
      type: 'select',
      formControlName: 'changeOfDob',
      isVisible: false,
      isMandatory: true,
      category: 'Product Servicing- Major Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Change of Gender',
      type: 'select',
      formControlName: 'changeOfGender',
      isVisible: false,
      isMandatory: true,
      category: 'Product Servicing- Major Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Change of PT/FT',
      type: 'select',
      formControlName: 'changeofPt',
      isVisible: false,
      isMandatory: true,
      category: 'Product Servicing- Major Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Change of Premium',
      type: 'select',
      formControlName: 'changeOfPremium',
      isVisible: false,
      isMandatory: true,
      category: 'Product Servicing- Major Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Free Look Period Cancell',
      type: 'select',
      formControlName: 'freeLookPeriodCancell',
      isVisible: false,
      isMandatory: true,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'Allowed',
    },
    {
      label: 'Death Claim',
      type: 'select',
      formControlName: 'deathClaim',
      isVisible: false,
      isMandatory: true,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'Allowed',
    },

    {
      label: 'Surrender',
      type: 'select',
      formControlName: 'surrender',
      isVisible: false,
      isMandatory: true,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'Allowed',
    },
    {
      label: 'Maturity',
      type: 'select',
      formControlName: 'maturity',
      isVisible: false,
      isMandatory: true,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'Allowed',
    },
    {
      label: 'Policy Cancellation',
      type: 'select',
      formControlName: 'policyCancellation',
      isVisible: false,
      isMandatory: true,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'Allowed',
    },
    {
      label: 'Product Start Date',
      type: 'text',
      formControlName: 'productStartDate',
      isVisible: false,
      isMandatory: false,
      category: 'Product boundary conditions',
      defaultVal: '9/5/2024',
    },
    {
      label: 'Product End Date',
      type: 'text',
      formControlName: 'productEndDate',
      isVisible: false,
      isMandatory: false,
      category: 'Product boundary conditions',
      defaultVal: '9/09/2024',
    },
    {
      label: 'Gender',
      type: 'text',
      formControlName: 'gender',
      isVisible: false,
      isMandatory: false,
      category: 'Product boundary conditions',
      defaultVal: true,
    },
    {
      label: 'Comunication Preferences',
      type: 'select',
      formControlName: 'comPreference',
      isVisible: false,
      isMandatory: false,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Beneficiary Update Process',
      type: 'select',
      formControlName: 'beneficiaryUpdateProcess',
      isVisible: false,
      isMandatory: false,
      category: 'Product Service - Non-financial Alterations',
      defaultVal: 'Allowed',
    },
    {
      label: 'Termination Reason Code',
      type: 'select',
      formControlName: 'terminationReasonCode',
      isVisible: false,
      isMandatory: false,
      category: 'Termination/Cancellation/Claims',
      defaultVal: 'TERM1',
    },
    {
      label: 'Premium Adjustment Option',
      type: 'select',
      formControlName: 'premiumAdjustmentOption',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
    {
      label: 'Premium Loading',
      type: 'select',
      formControlName: 'premiumLoading',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
    {
      label: 'Premium Payment Methods',
      type: 'select',
      formControlName: 'premiumPaymentMethods',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
    {
      label: 'Payment Frequency Change',
      type: 'select',
      formControlName: 'paymentFreqChange',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
    {
      label: 'Partial Payment Option',
      type: 'select',
      formControlName: 'partialPaymentOption',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
    {
      label: 'Payment Rescheduling',
      type: 'select',
      formControlName: 'paymentRescheduling',
      isVisible: false,
      isMandatory: false,
      category: 'Premiumand Payment Detail',
      defaultVal: 'POLC',
    },
  ];
  groupCategoryList: { [key: string]: any[] } = {};

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private shareproductData: ShareproductdataService,
    private formDataService: FormDataService
  ) {
    this.productInfoForm = new FormGroup({});
    this.isBlankTemplate = localStorage.getItem('createMode');
  }

  ngOnInit(): void {
    console.log(this.fieldsList);
    this.initialiseForm(); //Initialise the product details form
    this.initializeSearchForm(); //Initialise the search form
    this.formService$ = this.formDataService.callSaveFunction$.subscribe(
      (data) => {
        if (data === '0') {
          this.saveData();
        }
      }
    );
    this.generateFormFields();
    this.groupFieldsByCategory();
  }

  initializeSearchForm() {
    this.searchForm = this._fb.group({
      search: [''],
    });
  }

  initialiseForm() {
    this.productInfoForm = this._fb.group({});
  }

  saveData() {
    this.formDataService.setFormData('productInfo', this.productInfoForm.value);
  }

  nextData() {
    this.saveData();
    this.shareproductData.updateData(this.productInfoForm.value.productCode);
  }
  search(event) {
    const value = event.target.value.toLocaleLowerCase();
    this.searchFilterList = this.fieldsList.filter((field) =>
      field.label.toLocaleLowerCase().includes(value)
    );
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

  generateFormFields() {
    if (this.isBlankTemplate === 'create-by-template') {
      this.fieldsList.forEach((field) => {
        //assigning controls and values from saved draft
        if (this.mode.includes('edit-draft')) {
          this.templateFields = Object.keys(this.productData);
          field.defaultVal = this.productData[field.formControlName];
        }

        const isFieldExits = this.templateFields.some(
          (tempField) => field.formControlName === tempField
        );
        if (isFieldExits) {
          // field.isMandatory = true
          this.addRemoveControls(true, field);
        }
      });
      // checking if the created from template or from scratch
      // Taking only those fields which are mandatory
      this.searchFilterList = this.fieldsList.filter(
        (field) =>
          !this.templateFields.some((item) => item === field.formControlName)
      );
    } else {
      // Taking all fields
      this.searchFilterList = this.fieldsList;
    }
  }

  //getters
  get changeOfName() {
    return this.productInfoForm.get('changeOfName');
  }
  get appointeeChange() {
    return this.productInfoForm.get('appointeeChange');
  }
  get letters() {
    return this.productInfoForm.get('letters');
  }
  get nachRegisteration() {
    return this.productInfoForm.get('nachRegisteration');
  }
  get changeOfOwner() {
    return this.productInfoForm.get('changeOfOwner');
  }
  get changeOfNominee() {
    return this.productInfoForm.get('changeOfNominee');
  }
  get assignment() {
    return this.productInfoForm.get('assignment');
  }
  get changeOfAddress() {
    return this.productInfoForm.get('changeOfAddress');
  }
  get changeOfFrequency() {
    return this.productInfoForm.get('changeOfFrequency');
  }
  get changeOfContact() {
    return this.productInfoForm.get('changeOfContact');
  }
  get changeOfPan() {
    return this.productInfoForm.get('changeOfPan');
  }
  get duplicatePolicyNumber() {
    return this.productInfoForm.get('duplicatePolicyNumber');
  }
  get eia() {
    return this.productInfoForm.get('eia');
  }
  get changeOfOccupation() {
    return this.productInfoForm.get('changeOfOccupation');
  }
  get changeOfPep() {
    return this.productInfoForm.get('changeOfPep');
  }
  get changeOfUid() {
    return this.productInfoForm.get('changeOfUid');
  }
  get certificationOfExistance() {
    return this.productInfoForm.get('certificationOfExistance');
  }
  get policySearchUI() {
    return this.productInfoForm.get('policySearchUI');
  }
  get lapse() {
    return this.productInfoForm.get('lapse');
  }
  get revival() {
    return this.productInfoForm.get('revival');
  }
  get incDecInService() {
    return this.productInfoForm.get('incDecInService');
  }
  get changeOfDob() {
    return this.productInfoForm.get('changeOfDob');
  }
  get changeOfGender() {
    return this.productInfoForm.get('changeOfGender');
  }
  get changeofPt() {
    return this.productInfoForm.get('changeofPt');
  }
  get changeOfPremium() {
    return this.productInfoForm.get('changeOfPremium');
  }
  get freeLookPeriodCancell() {
    return this.productInfoForm.get('freeLookPeriodCancell');
  }
  get deathClaim() {
    return this.productInfoForm.get('deathClaim');
  }
  get surrender() {
    return this.productInfoForm.get('surrender');
  }
  get maturity() {
    return this.productInfoForm.get('maturity');
  }
  get policyCancellation() {
    return this.productInfoForm.get('policyCancellation');
  }
  get productStartDate() {
    return this.productInfoForm.get('productStartDate');
  }
  get productEndDate() {
    return this.productInfoForm.get('productEndDate');
  }
  get gender() {
    return this.productInfoForm.get('gender');
  }
  get comPreference() {
    return this.productInfoForm.get('comPreference');
  }
  get beneficiaryUpdateProcess() {
    return this.productInfoForm.get('beneficiaryUpdateProcess');
  }
  get terminationReasonCode() {
    return this.productInfoForm.get('terminationReasonCode');
  }
  get premiumAdjustmentOption() {
    return this.productInfoForm.get('premiumAdjustmentOption');
  }
  get premiumLoading() {
    return this.productInfoForm.get('premiumLoading');
  }
  get premiumPaymentMethods() {
    return this.productInfoForm.get('premiumPaymentMethods');
  }
  get paymentFreqChange() {
    return this.productInfoForm.get('paymentFreqChange');
  }
  get partialPaymentOption() {
    return this.productInfoForm.get('partialPaymentOption');
  }
  get paymentRescheduling() {
    return this.productInfoForm.get('paymentRescheduling');
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
      this.productInfoForm.addControl(
        action == 'single' ||
          action == 'yearly' ||
          action == 'halfyearly' ||
          action == 'quaterly' ||
          action == 'monthly'
          ? field.formControlName + '_' + action
          : field.formControlName,
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
      if (
        action == 'single' ||
        action == 'yearly' ||
        action == 'halfyearly' ||
        action == 'quaterly' ||
        action == 'monthly'
      ) {
        this.productInfoForm.removeControl(
          field.formControlName + '_' + action
        );
      } else {
        this.productInfoForm.removeControl(field.formControlName);
      }

      const index = this.fieldsList.findIndex(
        (x) => x.formControlName == field.formControlName
      );
      if (index != -1 && this.fieldsList[index].hasOwnProperty('comments')) {
        delete this.fieldsList[index]['comments'];
      }
    }

    const numberOfFields = Object.keys(this.productInfoForm.controls).length;
    if (numberOfFields > 0) {
      this.isPageBlank = false;
    } else {
      this.isPageBlank = true;
    }
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

  // Add/remove fields on checkout selection
  selectUnselectGroup(event, category) {
    const relFields = this.searchFilterList.filter(
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

  onSingleChange(isChecked: boolean) {
    this.isSingleSelected = isChecked;

    if (isChecked) {
      this.selectedFrequency = [];
      this.isOtherSelected = false;

      // Add all controls for the group 'productBoundaryCondition'
      this.addSingleFreqControls('single');
    } else {
      // Remove all controls for 'productBoundaryCondition' if "Single" is unchecked
      this.removeSingleFreqControls('single');
    }
  }

  onChangeFrequency(option: string) {
    const index = this.selectedFrequency.indexOf(option);

    if (index === -1) {
      this.selectedFrequency.push(option);
      this.isOtherSelected = true;

      // Add all controls for the group 'productBoundaryCondition'
      this.addSingleFreqControls(option.toLowerCase());
    } else {
      // Remove the frequency and check if any others are still selected
      this.selectedFrequency.splice(index, 1);
      if (this.selectedFrequency.length === 0) {
        this.isOtherSelected = false;
      }

      // Remove all controls for 'productBoundaryCondition' if no options are selected
      this.removeSingleFreqControls(option.toLowerCase());
    }
  }

  addSingleFreqControls(type) {
    this.premiumPaymentFrequencyList.forEach((field) => {
      this.addRemoveControls(true, field, type);
    });
  }
  removeSingleFreqControls(type) {
    this.premiumPaymentFrequencyList.forEach((field) => {
      this.addRemoveControls(false, field, type);
    });
  }
}
