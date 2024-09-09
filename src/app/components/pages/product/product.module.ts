import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ShareproductdataService } from '../../../service/shareproductdata.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers: [ShareproductdataService]
})
export class ProductModule { }
