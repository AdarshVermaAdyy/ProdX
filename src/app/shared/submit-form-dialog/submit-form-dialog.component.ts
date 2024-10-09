import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormDataService } from '../../service/form-data.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
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


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<SubmitFormDialogComponent>,
  private fb: FormBuilder,
  private formDataService: FormDataService,
  private route: Router
){
    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.submitForm = this.fb.group({
      startDate : new FormControl('',[Validators.required]),
      effectiveDate : new FormControl('',[Validators.required]),
      comments : new FormControl('',[Validators.required])
    })
  }

  submit(){
    if(this.submitForm.invalid){
      return
    }

    this.formDataService.saveData()
    this.formDataService.submit(this.submitForm.value)
    this.dialogRef.close();
    this.route.navigate(['/main/dashboard'])
  }

}
