import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-label',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatDialogModule,MatIconModule],
  templateUrl: './edit-label.component.html',
  styleUrl: './edit-label.component.scss'
})
export class EditLabelComponent implements OnInit {
  editLabelForm : FormGroup

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditLabelComponent>){

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.editLabelForm = this.fb.group({
      label : new FormControl('')
    })
  }
  changeLabel(){
    this.dialogRef.close(this.editLabelForm.get('label').value)
  }
}
