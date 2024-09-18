import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DocUploadDialogComponent } from '../doc-upload-dialog/doc-upload-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubmitFormDialogComponent } from '../submit-form-dialog/submit-form-dialog.component';
import { DraftDialogComponent } from '../draft-dialog/draft-dialog.component';

@Component({
  selector: 'app-header-ribbon',
  standalone: true,
  imports: [MatToolbarModule,
            MatButtonModule,
            MatIconModule,
            CommonModule,
            MatMenuModule,
            MatChipsModule,
            MatDialogModule,
            MatTooltipModule
          ],
  templateUrl: './header-ribbon.component.html',
  styleUrl: './header-ribbon.component.scss'
})
export class HeaderRibbonComponent implements OnChanges {

  @Input() stepper;

  constructor(private matdialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  docUpload(){
    const dialogRef = this.matdialog.open(DocUploadDialogComponent,{
      height: 'auto',
      width: '650px',
    });
  }

  submitProduct(){
    const dialogRef = this.matdialog.open(SubmitFormDialogComponent,
      {
        height: 'auto',
        width: '550px',
      }
    )
  }

  saveDraft(){
    const dialogRef = this.matdialog.open(DraftDialogComponent,
      {
        height: 'auto',
        width: '550px',
      }
    )
  }

}
