import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DocUploadDialogComponent } from '../doc-upload-dialog/doc-upload-dialog.component';

@Component({
  selector: 'app-header-ribbon',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,CommonModule,MatMenuModule,MatChipsModule,MatDialogModule],
  templateUrl: './header-ribbon.component.html',
  styleUrl: './header-ribbon.component.scss'
})
export class HeaderRibbonComponent {

  constructor(private matdialog: MatDialog){}

  docUpload(){
    const dialogRef = this.matdialog.open(DocUploadDialogComponent,{
      height: '500px',
      width: '650px',
    });
  }

}
