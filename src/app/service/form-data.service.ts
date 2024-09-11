import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formData = {};

  constructor() { }

  setFormData(page: string, data: any){
    this.formData[page] = data;
  }

  getFormDataByPageName(page: string){
    return this.formData[page] || {};
  }

  getAllFormData(){
    return this.formData;
  }

  clearFormData(){
    this.formData = {};
  }
}
