import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnInit{

  title : string = "Confirmation";
  message : string = "Are you sure ?";

  constructor( @Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<ConfirmationDialogComponent>){
    this.title = data.title || this.title;
    this.message = data.message || this.message
  }
  ngOnInit(): void {
   
  }
}
