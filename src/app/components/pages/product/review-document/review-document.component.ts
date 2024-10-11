import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { FormDataService } from '../../../../service/form-data.service';

export interface reviewTableElements {
  category: string;
  documentName: string;
  uploadeDate: string;
  fileType: string;
  size: string;
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
    MatStepperModule,
  ],
  templateUrl: './review-document.component.html',
  styleUrl: './review-document.component.scss',
})
export class ReviewDocumentComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'category',
    'documentName',
    'uploadDate',
    'fileType',
    'size',
    'action',
  ];
  isAddDocument: boolean = false;
  journey2:boolean = true;
  addDocumentSubsscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  value: string = '';
  filterValues = {
    search: '',
    category: '',
  };
  dataSource = new MatTableDataSource<reviewTableElements>();

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.getFormsValue();

    this.addDocumentSubsscription =
      this.formDataService.callAddDocument$.subscribe(() => {
        this.dataSource.data = this.formDataService.getDocList();
      });
  }

  categoryList: string[] = [
    'Draft Product Specification',
    'Internal Product Approval Documents',
    'Regulatory Compliance Documents',
    'Marketing Material Drafts',
    'Product Illustration Documents',
    'Product Development Timeline',
    'Product Concept Note',
    'Select Product',
  ];

  onAddDocument() {
    this.isAddDocument = true;
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
        ? data.category
            .toLowerCase()
            .includes(searchString.search.toLowerCase())
        : true; // If no search term is provided, do not filter by search

      // Check if the category matches, or allow all categories if none is selected
      const categoryMatch = searchString.category
        ? data.category.toLowerCase() === searchString.category.toLowerCase()
        : true; // If no category is selected, skip category filtering

      return searchMatch && categoryMatch; // Both search and category must match
    };

    console.log('after Prediction' + JSON.stringify(this.filterValues));
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.addDocumentSubsscription.unsubscribe();
  }

  deleteDoc(index) {
    this.formDataService.deleteDocument(index);
  }

  preview(file) {
    console.log(file);
    window.open(file?.fileDetails);
  }
}
