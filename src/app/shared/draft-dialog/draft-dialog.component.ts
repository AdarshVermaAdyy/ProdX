import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-draft-dialog',
  standalone: true,
  imports:  [MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
   CommonModule

  ],
  templateUrl: './draft-dialog.component.html',
  styleUrl: './draft-dialog.component.scss'
})
export class DraftDialogComponent {

  draftName = new FormControl('', [Validators.required]);
  title = "Save as Draft"

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<DraftDialogComponent>,private fb: FormBuilder){}

  ngOnInit(): void {
    
  }
}
