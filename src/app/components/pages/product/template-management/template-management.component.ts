import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { GetSetService } from '../../../../service/get-set.service';

export interface TemplateElement {
  thumbnail: string;
  productName: string;
  description: string;
  action: string;
}

const ELEMENT_DATA: TemplateElement[] = [
  {thumbnail: "<image>", productName: 'Standard Level Term Plan', description: "A basic level term insurance plan offering fixed coverage and premiums for a set period.", action: 'Create a New Product using this template'},
  {thumbnail: "<image>", productName: 'Premium Level Term Plan', description: "A level term plan with slightly higher premiums, providing additional benefits or riders.", action: 'He'},
  {thumbnail: "<image>", productName: 'Family Protector Level Plan', description: "Provides level term coverage with added benefits for family protection and financial security.", action: 'Li'},
  {thumbnail: "<image>", productName: 'Income Replacement Level Plan', description: "Designed to replace lost income in the event of the policyholder’s death, with fixed premiums and coverage.", action: 'Be'},
  {thumbnail: "<image>", productName: 'Flexible Benefit Level Plan', description: "Offers level term coverage with flexible benefits and options to customize based on individual needs.", action: 'B'},
  {thumbnail: "<image>", productName: 'Extended Coverage Level Plan', description: "Provides extended level term coverage beyond the standard term length, with fixed premiums.", action: 'C'},
];

@Component({
  selector: 'app-template-management',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatPaginator
  ],
  templateUrl: './template-management.component.html',
  styleUrl: './template-management.component.scss'
})
export class TemplateManagementComponent implements OnInit{
  displayedColumns: string[] = ['thumbnail', 'productName', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  subCategories = [];
  categoryList = [
    'Term Life Insurance',
    'Whole Life Insurance',
    'Universal Life Insurance',
    'Endowment Plans',
    'Group Life Insurance',
    'Unit Linked Insurance Plans (ULIPs)'
  ]

  subcategoryList = [
    {category : 'Term Life Insurance', subCategory : ['Basic Term Plans','Convertible Term Plans','Return of Premium Term Plans','Level Term Plans','Decreasing Term Plans']},
    {category : 'Whole Life Insurance', subCategory : ['Traditional Whole Life','Limited Pay Whole Life','Return of Premium Term Plans','Participating Whole Life','Non-Participating Whole Life']},
    {category : 'Universal Life Insurance', subCategory : ['Flexible Premium Universal Life','Indexed Universal Life','Guaranteed Universal Life','Variable Universal Life']},
    {category : 'Endowment Plans', subCategory : ['Regular Endowment Plans','Limited Pay Endowment Plans','Single Premium Endowment Plans','Unit-Linked Endowment Plans']},
    {category : 'Group Life Insurance', subCategory : ['Group Term Life Insurance','Group Whole Life Insurance','Group Universal Life Insurance','Group Endowment Plans']},
    {category : 'Unit Linked Insurance Plans (ULIPs)', subCategory : ['Regular Premium ULIPs','Single Premium ULIPs','Flexible Premium ULIPs','Equity Linked ULIPs','Debt Linked ULIPs']},
  ];

  constructor(private route: Router, private getSetService: GetSetService) {
  }

  ngOnInit(): void {
    
  }

  onCategoryChange(filter: any,event: any){
    this.subCategories = this.subcategoryList.filter(x =>{
      return x.category == event.value
    })
  }

  createNewProduct(){
    this.getSetService.set('createMode','create-by-template');
    this.route.navigate(['/main/product/create-product']);
  }
}
