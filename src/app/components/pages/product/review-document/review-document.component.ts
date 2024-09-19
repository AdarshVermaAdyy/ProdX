import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';


export interface  reviewTableElements{
  category : string;
  documentName : string;
  uploadeDate : string
  fileType : string;
  size : string;
}
@Component({
  selector: 'app-review-document',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatPaginator,
    MatSortModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './review-document.component.html',
  styleUrl: './review-document.component.scss'
})
export class ReviewDocumentComponent implements OnInit {
  displayedColumns: string[] = ['category', 'documentName', 'uploadeDate', 'fileType', 'size', 'action'];
  isAddDocument: boolean = false;
  filterForm : FormGroup
  @ViewChild(MatSort) sort: MatSort;
  value : string ="";
  filterValues = {
    search:'',
    category: ''
  }
  constructor(
    private fb : FormBuilder
  ){}
  
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search : new FormControl(),
      category : new FormControl()    
    })

    this.formSubscribe();
    this.getFormsValue();
 //   console.log("here is the form"+ this.getFormsValue());
  }

  dataSource = new MatTableDataSource<reviewTableElements>([
    {category: "Draft Product Specification", documentName: 'Product_Specs_V1.pdf', uploadeDate: '11/09/24', fileType: 'PDF',size:'12 MB'},
    {category: "Internal Product Approval Documents", documentName: 'Approval_Documents_2024.pdf', uploadeDate: '11/09/24', fileType: 'DOCX',size:'15 MB'},
    {category: "Regulatory Compliance Documents", documentName: 'Product_Specs_V3.pdf', uploadeDate: '14/09/24', fileType: 'PDF',size:'18 MB'},
    {category: "Marketing Material Drafts", documentName: 'Product_Design_V2.pdf', uploadeDate: '11/09/24', fileType: 'DOCX',size:'20 MB'},
    {category: "Product Illustration Documents", documentName: 'Test_Cases_2024.pdf', uploadeDate: '15/09/24', fileType: 'PDF',size:'25 MB'},
    {category: "Product Development Timeline", documentName: 'Product_Documentation_Templates.pdf', uploadeDate: '11/09/24', fileType: 'PDF',size:'30 MB'},
    {category: "Product Concept Note", documentName: 'Product_Brochures_2024.pdf', uploadeDate: '26/09/24', fileType: 'DOCX',size:'35 MB'},
    
   
  ]);
  categoryList: string[] = ['Draft Product Specification', 'Internal Product Approval Documents',
     'Regulatory Compliance Documents', 'Marketing Material Drafts','Product Illustration Documents', 
    'Product Development Timeline',
    'Product Concept Note', 'Select Product'
  ];
  
  onAddDocument(){
    console.log("add doument clicked");
    this.isAddDocument = true;
  }
  get search() {return this.filterForm.get('search'); }
  get category() { return this.filterForm.get('category'); }
  
  
  formSubscribe() {
    this.search.valueChanges.subscribe(searchValue =>{
      this.filterValues['search'] = searchValue
      console.log("searched data ... "+JSON.stringify(this.filterValues));
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.category.valueChanges.subscribe(catValue => {
        this.filterValues['category'] = catValue
        console.log("Cate data ... "+JSON.stringify(this.filterValues));
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
   
  }
  // getFormsValue() {
  //   this.dataSource.filterPredicate = (data, filter: string): boolean => {
  //     let searchString = JSON.parse(filter);
  //     const resultValue =  data?.category.toString().trim().toLowerCase().indexOf(searchString.search.toLowerCase()) !== -1 ;     
  //     return resultValue;   
  //   }
  //  console.log("after PRediction" + JSON.stringify(this.filterValues));
  //   this.dataSource.filter = JSON.stringify(this.filterValues);
  // }
  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
     
      // Check if the document name contains the search term
      const searchMatch = searchString.search
        ? data.category.toLowerCase().includes(searchString.search.toLowerCase())
        : true; // If no search term is provided, do not filter by search
  
      // Check if the category matches, or allow all categories if none is selected
      const categoryMatch = searchString.category
        ? data.category.toLowerCase() === searchString.category.toLowerCase()
        : true; // If no category is selected, skip category filtering
  
      return searchMatch && categoryMatch; // Both search and category must match
    };
  
    console.log("after Prediction" + JSON.stringify(this.filterValues));
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  resetFilter(){
    this.filterValues['category'] = '';
    this.filterValues['search'] = '';
    this.search.setValue('');
    this.search.updateValueAndValidity();
    this.category.setValue('');
    this.category.updateValueAndValidity();
  }
}
