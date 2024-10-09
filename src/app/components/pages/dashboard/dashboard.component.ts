import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserRole } from '../../../enums';
import { Router } from '@angular/router';
export interface PeriodicElement {

  taskId: string;
  Product_name: string;
  Task_name: string;
  Status: string;
  Description: string;
  Ageing: string;
  Prioity: string;
  Due_date: string;
}
export interface Feed {
  entrytype: string;
  timestamp: string;
  icon: string;
  Status: string;
  Description: string;
}
export interface Message {
  Messagetype: string;
  sender: string;
  Timestamp: string;
  Mpreview: string;
  mstatus: string;
  action: string;
  AFeilds: string;
}

export interface Product {
  thumbnail: string;
  productName: string;
  description: string;
  category: string;
  submittedOn: string;
  submittedBy: string;
  status: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { taskId: 'T1234', Product_name: 'Term Life Secure/TL001', Task_name: 'Complete Product Draft', Status: 'Completed', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T1343', Product_name: 'Term Life Plus/TL002', Task_name: 'Template Feedback', Status: 'Completed', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'High', Due_date: '30/08/2024' },
  { taskId: 'T4345', Product_name: 'Term Life Elite/TL003', Task_name: 'Finalize Pricing Strategy', Status: 'In Progress', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T6788', Product_name: 'Term Life Elite/TL003', Task_name: 'Review Competitor Products', Status: 'Pending', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T7657', Product_name: 'Term Life Elite/TL003', Task_name: 'Review Competitor Product', Status: 'Pending', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'High', Due_date: '30/08/2024' },
  { taskId: 'T4567', Product_name: 'Term Life Plus/TL002', Task_name: 'Complete Product Draft', Status: 'Pending', Description: 'Finalize the draft for the new product template by end of day.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T3456', Product_name: 'Term Life Plus/TL002', Task_name: 'Template Feedback', Status: 'Pending', Description: 'Go through the feedback from stakeholders on the new product template.', Ageing: '0 days', Prioity: 'High', Due_date: '30/08/2024' },
  { taskId: 'T7658', Product_name: 'Term Life Secure/TL001', Task_name: 'Finalize Pricing Strategy', Status: 'Pending', Description: 'Go through the feedback from stakeholders on the new product template.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T4577', Product_name: 'Term Life Secure/TL001', Task_name: 'Finalize Pricing Strategy', Status: 'Pending', Description: 'Go through the feedback from stakeholders on the new product template.', Ageing: '0 days', Prioity: 'low', Due_date: '30/08/2024' },
  { taskId: 'T3457', Product_name: 'Term Life Secure/TL001', Task_name: 'Finalize Pricing Strategy', Status: 'Pending', Description: 'Go through the feedback from stakeholders on the new product template.', Ageing: '0 days', Prioity: 'High', Due_date: '30/08/2024' },
];
const UPDATES_DATA: Feed[] = [
  { entrytype: 'Pinned Announcement', timestamp: '1 hour ago', icon: 'Complete Product Draft', Status: 'Team Meeting Scheduled for August 30, 2024', Description: 'Finalize the draft for the new product template by end of day.' },
  { entrytype: 'Progress Update', timestamp: '3 hour ago', icon: 'Complete Product Draft', Status: 'Suggested Feature: Auto-Renewal Option', Description: 'Finalize the draft for the new product template by end of day.' },
  { entrytype: 'Idea Suggestion', timestamp: '2 days ago', icon: 'Complete Product Draft', Status: 'New Competitor Product: TermLife Advantage', Description: 'Finalize the draft for the new product template by end of day.' },
  { entrytype: 'Competitor Insight', timestamp: '3 days ago', icon: 'Complete Product Draft', Status: 'Team Meeting Scheduled for August 30, 2024', Description: 'Finalize the draft for the new product template by end of day.' },
  { entrytype: 'Reminder', timestamp: '5 days ago', icon: 'Complete Product Draft', Status: 'New Competitor Product: TermLife Advantage', Description: 'Finalize the draft for the new product template by end of day.' },

]
const MESSAGES_DATA: Message[] = [
  { Messagetype: 'Task Reminder', sender: 'Project Manager', Timestamp: '10 min ago', Mpreview: 'Dont forget to submit your feedback on the new product template by end of day. This is critical for timely completion', mstatus: 'Unread', action: '', AFeilds: 'Priority Flag: Red for high priority messages' },
  { Messagetype: 'Task Reminder', sender: 'Project Manager', Timestamp: '2 days ago', Mpreview: 'Dont forget to submit your feedback on the new product template by end of day. This is critical for timely completion', mstatus: 'Unread', action: '', AFeilds: 'Priority Flag: Red for high priority messages' },
  { Messagetype: 'Task Reminder', sender: 'Project Manager', Timestamp: '3 days ago', Mpreview: 'Dont forget to submit your feedback on the new product template by end of day. This is critical for timely completion', mstatus: 'Unread', action: '', AFeilds: 'Priority Flag: Red for high priority messages' }
]

const PRODUCT_DATA: Product[] = []
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  tasksDataSource = new MatTableDataSource(ELEMENT_DATA);
  productDataSource = new MatTableDataSource(PRODUCT_DATA);
  updatesDataSource = new MatTableDataSource(UPDATES_DATA);
  messagesDataSource = new MatTableDataSource(MESSAGES_DATA);
  displayedColumns: string[] = ['taskId', 'Product_name', 'Task_name', 'Status', 'Description', 'Ageing', 'Prioity', 'Due_date', 'Completion_date', 'Call_Action'];
  displayedColumn: string[] = ['entrytype', 'timestamp', 'icon', 'Status', 'Description'];
  displayedColom: string[] = ['Messagetype', 'sender', 'Timestamp', 'Mpreview', 'mstatus', 'action', 'AFeilds']
  productColumns: string[] = ['thumbnail', 'productName', 'description', 'category', 'submittedOn', 'submittedBy', 'status', 'actions']
  // dataSource = ELEMENT_DATA;
  userRole = '';
  savedProducts = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.userRole = JSON.parse(localStorage.getItem('user')).role;
    if(this.userRole === UserRole.actuary){
      this.savedProducts = JSON.parse(localStorage.getItem('products'));
      this.productDataSource.data = this.savedProducts;
      this.productDataSource.paginator = this.paginator;
      this.productDataSource.sort = this.sort;
    } else {
      this.tasksDataSource.paginator = this.paginator;
      this.tasksDataSource.sort = this.sort;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tasksDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tasksDataSource.paginator) {
      this.tasksDataSource.paginator.firstPage();
    }
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updatesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.updatesDataSource.paginator) {
      this.updatesDataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.messagesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.messagesDataSource.paginator) {
      this.messagesDataSource.paginator.firstPage();
    }
  }
  editRow(row: any) {
    row.isEdit = true;
  }

  deleteRow(row: any) {
    const index = this.tasksDataSource.data.indexOf(row);
    if (index >= 0) {
      this.tasksDataSource.data.splice(index, 1);
      this.tasksDataSource._updateChangeSubscription();
    }
  }
  updateRow(row: any) {
    row.isEdit = false;
    // Update the data source with the new data
    this.messagesDataSource._updateChangeSubscription();
  }
  deleteRows(row: any) {
    const index = this.tasksDataSource.data.indexOf(row);
    if (index >= 0) {
      this.tasksDataSource.data.splice(index, 1);
      this.tasksDataSource._updateChangeSubscription();
    }
  }
  updateRows(row: any) {
    row.isEdit = false;
    // Update the data source with the new data
    this.tasksDataSource._updateChangeSubscription(); // Refresh the table
  }
  onUpdate() {
    // Your update logic here
    console.log('Update action triggered');
  }

  onDelete() {
    // Your delete logic here
    console.log('Delete action triggered');
  }

  editProduct(product){
    this.router.navigate(['main', 'product', 'edit-product', encodeURIComponent(product.productName)]);
  }


}
const TASKS_DATA = [
  { column1: 'Task 1', column2: 'Description 1', column3: 'Status 1' },
  // More task data
];

