import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-irda',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule],
  templateUrl: './irda.component.html',
  styleUrl: './irda.component.scss'
})
export class IrdaComponent {
  showQueries: boolean = false;
  showApprovalDetails: boolean = false;
  irdaform:FormGroup;
  productForm:FormGroup;
  file_store:any
  constructor(private fb: FormBuilder) {
    this.irdaform = this.fb.group({
      irdaQueries: [''],
      assigneeName: [''],
      assignTo: [''],
      irdaUinNumber: [''],
      approvalDate: [''],
      additionalDetails: [''],
      approvalDocument: ['']
    });
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      submissionDate: ['', Validators.required],
      irdaReferenceNumber: ['', Validators.required],
      documents: [null, Validators.required],
      comments: [''],
      implementation_note:['',Validators.required]
    });


  }

  // toggleSection(section: string,event:any): void {
  //   if (section === 'showQueries') {
  //     this.showQueries = !this.showQueries;
  //     if(this.showQueries){
  //       if (event.target.checked) {
  //         console.log('Checkbox is checked');
  //         this.showApprovalDetails = false;
  //       }
  //     }
  //   } else if (section=== 'showApprovalDetails') {
  //     this.showApprovalDetails = !this.showApprovalDetails;
  //     if(this.showApprovalDetails){
  //       if (event.target.checked) {
  //         this.showQueries = false;
  //         console.log('Checkbox is checked');
  //       }

  //     }
  //   }
  // }
  toggleSection(section: string, event: any): void {
    if (section === 'showQueries') {
      this.showQueries = event.checked;
      if (this.showQueries) {
        this.showApprovalDetails = false;
      }
    } else if (section === 'showApprovalDetails') {
      this.showApprovalDetails = event.checked;
      if (this.showApprovalDetails) {
        this.showQueries = false;
      }
    }
  }

  handleFileInputChange(l, event): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      // this.irdaform.addControl.patchValue(`${f.name}${count}`);
    } else {
      // this.irdaform.patchValue.('');
    }
  }
  handleFileInputChanges(l, event): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      // this.irdaform.addControl.patchValue(`${f.name}${count}`);
    } else {
      // this.irdaform.patchValue.('');
    }
  }
  handleFileInputChang(l, event): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      // this.irdaform.addControl.patchValue(`${f.name}${count}`);
    } else {
      // this.irdaform.patchValue.('');
    }
  }
  uploadDoc(files) {
    if (files.length) {
      for (let i = 0; i < files.length; i++) {

      // this.table.renderRows();
      // this.display.patchValue('');
    }
  }}


  onSubmit(): void {
    console.log(this.irdaform.value);
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        documents: file
      });
    }
  }



}
