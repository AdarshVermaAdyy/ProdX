import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DocUploadDialogComponent } from '../doc-upload-dialog/doc-upload-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubmitFormDialogComponent } from '../submit-form-dialog/submit-form-dialog.component';
import { DraftDialogComponent } from '../draft-dialog/draft-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormDataService } from '../../service/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-ribbon',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './header-ribbon.component.html',
  styleUrl: './header-ribbon.component.scss',
})
export class HeaderRibbonComponent implements OnChanges {
  @Input() stepper;

  constructor(
    private matdialog: MatDialog,
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  docUpload() {
    const dialogRef = this.matdialog.open(DocUploadDialogComponent, {
      height: 'auto',
      width: '650px',
      disableClose: true,
    });
  }

  submitProduct() {
    const dialogRef = this.matdialog.open(SubmitFormDialogComponent, {
      height: 'auto',
      width: '550px',
    });
  }

  deleteDraft() {
    const dialogRef = this.matdialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Draft',
        message: 'Are you sure, you want to delete this draft?',
        action: 'delete-draft',
      },
    });
  }

  saveDraft() {
    // const dialogRef = this.matdialog.open(DraftDialogComponent,
    //   {
    //     height: 'auto',
    //     width: '550px',
    //   }
    // )
    this.formDataService.saveData();
    this.formDataService.saveAsDraft();
    this.router.navigate(['/main/drafts']);
  }
  movetoirda(){
    this.router.navigate(['/main/irda']);
  }
}
