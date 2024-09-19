import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {


  private callSaveFunction = new Subject<string>();
  callSaveFunction$ = this.callSaveFunction.asObservable();
  private formData = {};

  constructor() { }

  saveData() {
    const currentForm = localStorage.getItem('currentForm');
    this.callSaveFunction.next(currentForm);
  }

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

  private fetchDraftsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('myDrafts')) || [];
  }

  private saveDraftToLocalStorage(drafts){
    localStorage.setItem('myDrafts', JSON.stringify(drafts));
  }

  private fetchProductsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  private saveProductsToLocalStorage(products){
    localStorage.setItem('products', JSON.stringify(products));
  }

  saveAsDraft(draftName){
    if(Object.keys(this.formData).length === 0){
      return;
    }

    const drafts = this.fetchDraftsFromLocalStorage();
    const newData = {
      draftName: draftName,
      data: this.formData
    }

    drafts.push(newData);
    this.saveDraftToLocalStorage(drafts);

    this.clearFormData()
  }

  submit({productName, startDate, effectiveDate, comments}){
    if(Object.keys(this.formData).length === 0){
      return;
    }

    const products = this.fetchProductsFromLocalStorage();
    const newData = {
      productName: productName,
      startDate: startDate,
      effectiveDate: effectiveDate,
      comments: comments,
      data: this.formData
    }

    products.push(newData);
    this.saveProductsToLocalStorage(products);

    this.clearFormData()
  }
}
