import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {  ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatListModule,CommonModule,MatFormFieldModule,MatButtonModule,MatDividerModule,MatMenuModule,MatDialogModule,
    RouterModule,
    BreadcrumbComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  notificationArray = [{title: "Notification",msg: "This is a notification",icon:"edit"},
    {title: "Notification",msg: "This is a notification",icon:"edit"},
    {title: "Notification",msg: "This is a notification",icon:"edit"},
    {title: "Notification",msg: "This is a notification",icon:"edit"}
  ]

  isRibbonAllowed : boolean=false;
  
  constructor(private matdialog: MatDialog){}

  openDialog(){
    const dialogRef = this.matdialog.open(ConfirmationDialogComponent,{
      data: {
        title : "Logout",message : "Are you sure, you want to logout?"
      }
    });
  }

  // mouseenter() {
  //   if (!this.isExpanded) {
  //     this.isShowing = true;
  //   }
  // }

  // mouseleave() {
  //   if (!this.isExpanded) {
  //     this.isShowing = false;
  //   }
  // }
  @ViewChild('sidenav') sidenav:any= MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
