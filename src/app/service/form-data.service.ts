import { Injectable } from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {


  private callSaveFunction = new Subject<string>();
  callSaveFunction$ = this.callSaveFunction.asObservable();
  private callAddDocument = new Subject();
  callAddDocument$ = this.callAddDocument.asObservable();
  private formData = {};
  private docList = [];

  constructor() { }

  saveData() {
    const currentForm = localStorage.getItem('currentForm');
    this.callSaveFunction.next(currentForm);
  }

  updateDocument(){
    this.callAddDocument.next('add')
  }

  setFormData(page: string, data: any){
    this.formData[page] = data;
  }

  addDocument(data){
    this.docList = [...this.docList, ...data];
    this.updateDocument();
  }

  deleteDocument(index){
    this.docList.splice(index, 1);
    this.updateDocument();
  }

  getFormDataByPageName(page: string){
    return this.formData[page] || {};
  }

  getAllFormData(){
    return this.formData;
  }

  getDocList(){
    return this.docList;
  }

  clearFormData(){
    this.formData = {};
    this.docList = [];
  }

  fetchDraftsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('myDrafts')) || [];
  }

  fetchDraftsFromLocalStorageByName(draftName){
    return JSON.parse(localStorage.getItem('myDrafts')).filter(draft => draft.draftName === draftName)[0] || {};
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
      lastEdited : moment(new Date()).format('MMMM D, YYYY'),
      draftName: draftName,
      data: this.formData,
      status : 'draft',
      documents: this.docList
    }

    drafts.push(newData);
    this.saveDraftToLocalStorage(drafts);

    this.clearFormData();
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
      data: this.formData,
      documents: this.docList
    }

    products.push(newData);
    this.saveProductsToLocalStorage(products);

    this.clearFormData();
  }

  deleteDraft(index){
    const drafts = this.fetchDraftsFromLocalStorage();
    drafts.splice(index, 1);
    this.saveDraftToLocalStorage(drafts);
  }
}
