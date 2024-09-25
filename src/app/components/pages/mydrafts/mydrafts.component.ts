import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GetSetService } from '../../../service/get-set.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormDataService } from '../../../service/form-data.service';

export interface productElement {
  draftName: string;
  description: string;
  category: string;
  lastEdited: string;
  status: string
}
@Component({
  selector: 'app-mydrafts',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule],
  templateUrl: './mydrafts.component.html',
  styleUrl: './mydrafts.component.scss'
})
export class MydraftsComponent {
  value: string = "";
  filterForm: FormGroup
  subCategories = [];
  displayedColumns: string[] = ['thumbnail', 'draftName', 'description', 'category', 'lastEdited', 'status', 'action'];
  categoryList: string[] = ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance', 'Endowment Plans', 'Group Life Insurance', 'Unit Linked Insurance Plans (ULIPs)'];
  subcategoryList = [
    { category: 'Term Life Insurance', subCategory: ['Basic Term Plans', 'Convertible Term Plans', 'Return of Premium Term Plans', 'Level Term Plans', 'Decreasing Term Plans'] },
    { category: 'Whole Life Insurance', subCategory: ['Traditional Whole Life', 'Limited Pay Whole Life', 'Return of Premium Term Plans', 'Participating Whole Life', 'Non-Participating Whole Life'] },
    { category: 'Universal Life Insurance', subCategory: ['Flexible Premium Universal Life', 'Indexed Universal Life', 'Guaranteed Universal Life', 'Variable Universal Life'] },
    { category: 'Endowment Plans', subCategory: ['Regular Endowment Plans', 'Limited Pay Endowment Plans', 'Single Premium Endowment Plans', 'Unit-Linked Endowment Plans'] },
    { category: 'Group Life Insurance', subCategory: ['Group Term Life Insurance', 'Group Whole Life Insurance', 'Group Universal Life Insurance', 'Group Endowment Plans'] },
    { category: 'Unit Linked Insurance Plans (ULIPs)', subCategory: ['Regular Premium ULIPs', 'Single Premium ULIPs', 'Flexible Premium ULIPs', 'Equity Linked ULIPs', 'Debt Linked ULIPs'] },
  ];

  dataSource = new MatTableDataSource([])

  statusList = ['Draft', 'In Review']

  // none value
  filterValues = {
    search: '',
    category: '',
    subCategory: '',
    status: '',
    dateCreated: ''
  }

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private getSetService: GetSetService,
    private formDataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      category: new FormControl(),
      subCategory: new FormControl(),
      search: new FormControl(),
      status: new FormControl(),
      dateCreated: new FormControl()
    })

    this.getDraftList();
    this.formSubscribe();
    this.getFormsValue();
  }

  getDraftList() {

    if (localStorage.getItem('myDrafts') == null || localStorage.getItem('myDrafts') == undefined) {
      this.dataSource.data = [];
    } else {
      this.dataSource.data = this.formDataService.fetchDraftsFromLocalStorage();
    }
  }

  get category() { return this.filterForm.get('category'); }
  get subCategory() { return this.filterForm.get('subCategory'); }
  get search() { return this.filterForm.get('search'); }
  get status() { return this.filterForm.get('status'); }
  get dateCreated() { return this.filterForm.get('dateCreated'); }
  // form subscribe
  formSubscribe() {
    this.search.valueChanges.subscribe(searchValue => {
      this.filterValues['search'] = searchValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.category.valueChanges.subscribe(catValue => {
      this.filterValues['category'] = catValue
      this.filterValues['subCategory'] = '';
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.subCategory.valueChanges.subscribe(subcatValue => {
      this.filterValues['subCategory'] = subcatValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.status.valueChanges.subscribe(statusVal => {
      this.filterValues['status'] = statusVal
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  // create filter
  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      console.log(data)
      let searchString = JSON.parse(filter);

      const resultValue = (data?.draftName.toString().trim().toLowerCase().indexOf(searchString.search.toLowerCase()) !== -1 || data?.description.toString().trim().toLowerCase().indexOf(searchString.search.toLowerCase()) !== -1) &&
        data?.data?.productDetails?.category.toString().trim().toLowerCase().indexOf(searchString.category.toLowerCase()) !== -1 &&
        data?.data?.productDetails?.category.toString().trim().toLowerCase().indexOf(searchString.subCategory.toLowerCase()) !== -1 &&
        data?.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1

      return resultValue;

    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCategoryChange(filter: any, event: any) {
    this.subCategories = this.subcategoryList.filter(x => {
      return x.category == event.value
    })
  }

  resetFilter() {
    this.filterValues['category'] = ''
    this.filterValues['subCategory'] = '';
    this.filterValues['status'] = ''
    this.filterValues['search'] = '';
    this.search.setValue('');
    this.search.updateValueAndValidity();
    this.category.setValue('');
    this.category.updateValueAndValidity();
    this.subCategory.setValue('');
    this.subCategory.updateValueAndValidity();
    this.status.setValue('');
    this.status.updateValueAndValidity();
  }

  createNewProduct() {
    this.getSetService.set('createMode', 'create-by-blank');
    this.route.navigate(['/main/product/create-product']);
  }

  deleteDraft(index){
    this.formDataService.deleteDraft(index);
    this.dataSource.data = this.formDataService.fetchDraftsFromLocalStorage();
  }

  editDraft(draft){
    this.route.navigate(['main', 'product', 'edit-draft', encodeURIComponent(draft.draftName)]);
  }
}
