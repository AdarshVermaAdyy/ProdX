import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';

export interface Element {
  column1: string;
  column2: string;
  column3: string;
}
export interface Elements {
  uploadedRatesList: string;

  totalCombinationCount: number;
  success: number;
  fail: number;
  callToAction: string;
  uploadedBy: string;
  timestamp: string;
}
const ELEMENT_DATA: Element[] = [
  {column1: 'Possible Combination', column2: '30', column3: '5'},
  // add more data as needed
];
const my_data: Elements[] = [
  {uploadedRatesList: ' 1', totalCombinationCount: 10, success: 8, fail: 2, callToAction: '', uploadedBy: 'User 1', timestamp: '2024-10-08 13:00:00'},
  {uploadedRatesList: ' 2', totalCombinationCount: 20, success: 18, fail: 2, callToAction: '', uploadedBy: 'User 2', timestamp: '2024-10-08 14:00:00'},
  // add more data as needed
];
@Component({
  selector: 'app-rate-table',
  standalone: true,
  imports: [MatRadioButton,MatDialogClose,MatMenuModule,MatStepperModule, MatPaginatorModule,MatSortModule,MatTableModule, MatRadioGroup,MatListModule,MatIconModule,CommonModule,HttpClientModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './rate-table.component.html',
  styleUrl: './rate-table.component.scss'
})

export class RateTableComponent {
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  productName:any;
  summaryVisible:boolean = false;
  selectedFiles: FileList;
  uploadedFiles: File[] = [];
  displayedColumns: string[] = ['column1', 'column2', 'column3'];
  displayedColumn: string[] = ['uploadedRatesList', 'totalCombinationCount', 'success', 'fail', 'callToAction', 'uploadedBy', 'timestamp'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSources = new MatTableDataSource(my_data);




  constructor(private http: HttpClient,public dialog: MatDialog,private router: Router) {}


ngOnInit():void{
  this.summaryVisible = false;
  const storedData = localStorage.getItem('myDrafts');
  if (storedData) {
    const drafts = JSON.parse(storedData);
    if (drafts.length > 0) {
      this.productName = drafts[0].data.productDetails.productName;
    }
  }



}

// openDialog(): void {
//   this.dialog.open(this.dialogTemplate, {
//     data: { productName: this.productName }
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     this.router.navigate(['/target-page']); // Replace '/target-page' with your target route
//   });

// }
openDialog(): void {
  const currentDate = new Date();
    const submissionDate = currentDate.toLocaleString();
  const dialogRef = this.dialog.open(this.dialogTemplate, {
    data: { productName: this.productName,
      submissionDate: submissionDate
     }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.router.navigate(['/dashboard']); // Replace '/target-page' with your target route
  });

}

onFileSelected(event: any) {
  this.selectedFiles = event.target.files;
}

onUpload() {
  this.uploadedFiles.push(...Array.from(this.selectedFiles));


  // const formData = new FormData();
  // for (let i = 0; i < this.selectedFiles.length; i++) {
  //   formData.append('files', this.selectedFiles[i]);
  // }
  // this.uploadedFiles = Array.from(this.selectedFiles);

  // this.http.post('YOUR_API_ENDPOINT', formData).subscribe(response => {
  //   console.log('Upload successful', response);

  // });
}
removeFile(index: number) {
  this.uploadedFiles.splice(index, 1);
}
downloadFile() {
  const fileUrl = 'assets/files/rating_excel.xlsx'; // Replace with your file path
  // this.http.get(fileUrl, { responseType: 'blob' }).subscribe(blob => {
  //   saveAs(blob, 'downloaded-file.xlsx');
  // });
}
getsummary(){
  this.summaryVisible = true;
}

navtohome(): void {
  this.dialog.closeAll();
  this.router.navigate(['/main/dashboard']); // Replace '/target-page' with your target route
}




}
