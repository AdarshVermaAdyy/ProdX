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
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

export interface productElement {
  productName: string;
  description: string;
  category: string;
  subCategory: string;
  status : string
}

@Component({
  selector: 'app-product-management',
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
      CommonModule,
      ReactiveFormsModule,
      MatMenuModule
    ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit{

  value : string ="";
  filterForm : FormGroup
  subCategories= [];
  displayedColumns: string[] = ['thumbnail','productName', 'description', 'category', 'subCategory','status','action'];
  categoryList: string[] = ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance','Endowment Plans','Group Life Insurance','Unit Linked Insurance Plans (ULIPs)'];
  subcategoryList = [
    {category : 'Term Life Insurance', subCategory : ['Basic Term Plans','Convertible Term Plans','Return of Premium Term Plans','Level Term Plans','Decreasing Term Plans']},
    {category : 'Whole Life Insurance', subCategory : ['Traditional Whole Life','Limited Pay Whole Life','Return of Premium Term Plans','Participating Whole Life','Non-Participating Whole Life']},
    {category : 'Universal Life Insurance', subCategory : ['Flexible Premium Universal Life','Indexed Universal Life','Guaranteed Universal Life','Variable Universal Life']},
    {category : 'Endowment Plans', subCategory : ['Regular Endowment Plans','Limited Pay Endowment Plans','Single Premium Endowment Plans','Unit-Linked Endowment Plans']},
    {category : 'Group Life Insurance', subCategory : ['Group Term Life Insurance','Group Whole Life Insurance','Group Universal Life Insurance','Group Endowment Plans']},
    {category : 'Unit Linked Insurance Plans (ULIPs)', subCategory : ['Regular Premium ULIPs','Single Premium ULIPs','Flexible Premium ULIPs','Equity Linked ULIPs','Debt Linked ULIPs']},
  ];

  dataSource = new MatTableDataSource<productElement>([
    {productName: "Regular Premium ULIP Plan A", description: 'A ULIP with regular premium payments offering life coverage and investment options.', category: 'Unit Linked Insurance Plans (ULIPs)', subCategory: 'Regular Premium ULIP',status:'Active'},
    {productName: "Regular Premium ULIP Plan B", description: 'Provides life coverage with regular premium payments and a diversified investment portfolio.', category: 'Unit Linked Insurance Plans (ULIPs)', subCategory: 'Equity Linked ULIPs',status:'Inactive'},
    {productName: "Regular Premium ULIP Plan C", description: 'ULIP with consistent premium payments, combining insurance coverage and wealth accumulation benefits.', category: 'Unit Linked Insurance Plans (ULIPs)', subCategory: 'Regular Premium ULIP',status:'Inactive'},
    {productName: "Regular Premium ULIP Plan D", description: 'Offers regular premium payments with a focus on long-term investment growth and insurance coverage.', category: 'Unit Linked Insurance Plans (ULIPs)', subCategory: 'Equity Linked ULIPs',status:'Active'},
    {productName: "Regular Premium ULIP Plan E", description: 'Combines regular premium payments with extensive investment options and life coverage.', category: 'Group Life Insurance', subCategory: 'Regular Premium ULIP',status:'Inactive'},
    {productName: "Regular Premium ULIP Plan F", description: 'Designed for regular premium payments with comprehensive insurance and investment features.', category: 'Group Life Insurance', subCategory: 'Group Universal Life Insurance',status:'Active'},
    {productName: "Regular Premium ULIP Plan G", description: 'Regular Premium ULIP Plan A', category: 'Universal Life Insurance', subCategory: 'Regular Premium ULIP',status:'Inactive'},
    {productName: "Regular Premium ULIP Plan H", description: 'Designed for regular premium payments with comprehensive insurance and investment features.', category: 'Group Life Insurance', subCategory: 'Regular Premium ULIP',status:'Active'},
    {productName: "Regular Premium ULIP Plan I", description: 'Regular Premium ULIP Plan A', category: 'Universal Life Insurance', subCategory: 'Regular Premium ULIP',status:'Active'},
    {productName: "Regular Premium ULIP Plan J", description: 'ULIP with consistent premium payments, combining insurance coverage and wealth accumulation benefits.', category: 'ULIPs', subCategory: 'Regular Premium ULIP',status:'Active'},
    {productName: "Regular Premium ULIP Plan K", description: 'Regular Premium ULIP Plan A', category: 'Universal Life Insurance', subCategory: 'Regular Premium ULIP',status:'Active'},
   
  ])

  statusList =['Active','Inactive']
  
    // none value
filterValues = {
  search:'',
  category: '',
subCategory : '',
status:''
}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      category : new FormControl(),
      subCategory : new FormControl(),
      search : new FormControl(),
      status : new FormControl()
    })

    this.formSubscribe();
    this.getFormsValue();
  }

  get category() { return this.filterForm.get('category'); }
  get subCategory() { return this.filterForm.get('subCategory'); }
  get search() {return this.filterForm.get('search');}
  get status(){return this.filterForm.get('status');}

   // form subscribe
   formSubscribe() {
    this.search.valueChanges.subscribe(searchValue =>{
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
      let searchString = JSON.parse(filter);
     
      const resultValue = ( data?.productName.toString().trim().toLowerCase().indexOf(searchString.search.toLowerCase()) !== -1 ||  data?.description.toString().trim().toLowerCase().indexOf(searchString.search.toLowerCase()) !== -1) &&
      data?.category.toString().trim().toLowerCase().indexOf(searchString.category.toLowerCase()) !== -1 &&
        data?.subCategory.toString().trim().toLowerCase().indexOf(searchString.subCategory.toLowerCase()) !== -1 &&
        data?.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1 
        
      return resultValue;

    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  onCategoryChange(filter: any,event: any){
    this.subCategories = this.subcategoryList.filter(x =>{
      return x.category == event.value
    })
  
  }

  resetFilter(){
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

}
