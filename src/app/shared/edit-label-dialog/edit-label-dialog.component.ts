import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-label-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './edit-label-dialog.component.html',
  styleUrl: './edit-label-dialog.component.scss'
})
export class EditLabelDialogComponent implements OnInit{

  editLabelForm: FormGroup
  currentLabel = '';
  newLabel = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditLabelDialogComponent>,
    private _fb: FormBuilder
  ) {
    this.currentLabel = data.currentLabel;
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.editLabelForm = this._fb.group({
      editlabel: [this.currentLabel]
    });
  }

  get editLabel(){
    return this.editLabelForm.get('editLabel');
  }

  cancel(){
    this.dialogRef.close({event: 'cancel'})
  }

  changeLabel(){
    debugger
    this.dialogRef.close({event: 'label-changed', data: this.editLabel.value})
  }
}
