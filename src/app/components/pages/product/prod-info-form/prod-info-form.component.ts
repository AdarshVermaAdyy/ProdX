import { Component, OnInit, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './prod-info-form.component.html',
  styleUrl: './prod-info-form.component.scss'
})
export class ProdInfoFormComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  isSubmitted = false;
  dynamicForm!: FormGroup;
  availableOptions!: any[];
  optionalFieldsList!: any[];
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

  constructor(private fb: FormBuilder, private formService: ProductInfoServiceService, private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.availableOptions = this.formService.getAvailableOptions();
    this.optionalFieldsList = this.formService.getOptionalFieldOptions();

    this.dynamicForm = this.formService.initializeForm();
    this.dynamicForm.get('optionalOption')?.valueChanges.subscribe(data => {
      this.formService.updateFormGroups(this.dynamicForm);
    });

    this.addCheckboxes();



  }

  getUniqueGroup() {
    const groups = this.optionalFieldsList.map(option =>
      option.group.trim()
    );
    const uniqueGroups = Array.from(new Set(groups));
  //  console.log("unique groups"+ uniqueGroups);
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
  addCheckboxes() {
    this.optionalFieldsList.forEach((option: any, index: number) => {
      if (!this.isDefaultField(option)) {
        const control = this.options.at(index) as FormControl;
        control.setValue(false);
      }
    });
  }

  isDefaultField(option: any): boolean {
    return ['Entity Age', 'Maturity Age', 'Premium Payment Frequency', 'PT (In Year)', 'Gender', 'Username', 'Premium Payment Type'].includes(option.label);
  }
  // addRemoveControls(event: any, field: any, index: number) {
  //   console.log("Input add check");

  // }
  // onCheckboxChange(e: any, index: number) {

  //   const option = this.optionalFieldsList[index];

  //   const selectedGroup = this.formService.createDynamicFormGroup(option.label, option.type, option);

  //   if (e.checked) {
  //     if (option.group === 'productBoundaryCondition') {
  //       this.productBoundaryCondition.push(selectedGroup);

  //     } else if (option.group === 'premiumDetails') {
  //       this.premiumDetails.push(selectedGroup);
  //     }
  //     else if (option.group === 'featreandReinsate') {
  //       this.featreandReinsate.push(selectedGroup);
  //     }
  //     else if (option.group === 'productServicingAlteration') {
  //       this.productServicingAlteration.push(selectedGroup);
  //     }
  //     else if (option.group === 'terminationCancellation') {
  //       this.terminationCancellation.push(selectedGroup);
  //     }
  //     else if (option.group === 'productBoundary') {
  //       this.productBoundary.push(selectedGroup);
  //     }

  //   } else {
  //     const selectedIndex = this.findOptionIndex(option.label, option.group);
  //     if (selectedIndex > -1) {
  //       if (option.group === 'productBoundaryCondition') {
  //         this.productBoundaryCondition.removeAt(selectedIndex);
  //       } else if (option.group === 'premiumDetails') {
  //         this.premiumDetails.removeAt(selectedIndex);
  //       }
  //       else if (option.group === 'featreandReinsate') {
  //         this.featreandReinsate.removeAt(selectedIndex);
  //       }
  //       else if (option.group === 'productServicingAlteration') {
  //         this.productServicingAlteration.removeAt(selectedIndex);
  //       }
  //       else if (option.group === 'terminationCancellation') {
  //         this.terminationCancellation.removeAt(selectedIndex);
  //       }
  //       else if (option.group === 'productBoundary') {
  //         this.productBoundary.removeAt(selectedIndex);
  //       }
  //     }
  //   }
  // }

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

  onSubmit() {
    console.log("dynamic error is.." + this.dynamicForm.errors);
    if (this.dynamicForm.invalid) {
      console.log("invalid form ...", this.dynamicForm.value);
      this.markAllAsTouched();
    } else {
      this.isSubmitted = true;
      console.log("Form submitted ", this.dynamicForm.value);
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

console.log("option"+ JSON.stringify(option));
      const selectedGroup = this.formService.createDynamicFormGroup(option.label, option.type, option);

      if (option.group === 'productBoundaryCondition') {

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

  }
  
}
