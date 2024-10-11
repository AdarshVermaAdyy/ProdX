import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-response-irda',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule],
  templateUrl: './response-irda.component.html',
  styleUrl: './response-irda.component.scss'
})
export class ResponseIrdaComponent {
  showQueries: boolean = false;
  showApprovalDetails: boolean = false;
  irdaform:FormGroup;
  file_store:any
  productName:any;

  constructor(private fb: FormBuilder){
    this.irdaform = this.fb.group({
      irdaQueries: [''],
      assigneeName: [''],
      assignTo: [''],
      irdaUinNumber: [''],
      approvalDate: [''],
      additionalDetails: [''],
      approvalDocument: ['']
    });
  }


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
      this.irdaform.patchValue({
        documents: file
      });
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

}
