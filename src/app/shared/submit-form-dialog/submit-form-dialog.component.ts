import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-submit-form-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
   CommonModule,
   MatDatepickerModule

  ],
  templateUrl: './submit-form-dialog.component.html',
  styleUrl: './submit-form-dialog.component.scss'
})
export class SubmitFormDialogComponent implements OnInit {

  title : string = "Submit your Draft";
  submitForm : FormGroup;
  yesterday = new Date();
  allowSubmitForm : boolean = true;
  isSubmitiSuccess : boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<SubmitFormDialogComponent>,private fb: FormBuilder){
    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.submitForm = this.fb.group({
      productName : new FormControl('',[Validators.required]),
      startDate : new FormControl('',[Validators.required]),
      effectiveDate : new FormControl('',[Validators.required]),
      comments : new FormControl('',[Validators.required])
    })
  }

}
