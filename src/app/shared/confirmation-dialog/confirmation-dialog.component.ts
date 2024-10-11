import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../service/form-data.service';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnInit {

  title: string = "Confirmation";
  message: string = "Are you sure ?";
  action: string = 'logout';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private formDataService: FormDataService,
    private route: Router
  ) {
    this.title = data.title || this.title;
    this.message = data.message || this.message;
    this.action = data.action;
  }
  ngOnInit(): void {

  }

  deleteDraft() {
    this.formDataService.clearFormData();
    this.route.navigate(['main/drafts'])
  }


  logout(){
    localStorage.removeItem('user');
    this.route.navigate(['auth/login'])
  }
}
