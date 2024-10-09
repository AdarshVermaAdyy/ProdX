import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Subject } from 'rxjs';
import { ProductStatus } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private callSaveFunction = new Subject<string>();
  callSaveFunction$ = this.callSaveFunction.asObservable();
  private callAddDocument = new Subject();
  callAddDocument$ = this.callAddDocument.asObservable();
  private formData: any = {};
  private docList = [];
  mode = '';

  constructor(private route: Router) {}

  saveData() {
    const currentForm = localStorage.getItem('currentForm');
    this.callSaveFunction.next(currentForm);
  }

  updateDocument() {
    this.callAddDocument.next('add');
  }

  setFormData(page: string, data: any) {
    this.formData[page] = data;
  }

  addDocument(data) {
    this.docList = [...this.docList, ...data];
    this.updateDocument();
  }

  deleteDocument(index) {
    this.docList.splice(index, 1);
    this.updateDocument();
  }

  getFormDataByPageName(page: string) {
    return this.formData[page] || {};
  }

  getAllFormData() {
    return this.formData;
  }

  getDocList() {
    return this.docList;
  }

  clearFormData() {
    this.formData = {};
    this.docList = [];
  }

  fetchDraftsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('myDrafts')) || [];
  }

  fetchDraftsFromLocalStorageByName(draftName) {
    const draftData = JSON.parse(localStorage.getItem('myDrafts')).filter(
      (draft) => draft.draftName === draftName
    )[0];
    this.formData = draftData.data || {};
    return draftData;
  }

  fetchProductFromLocalStorageByName(productName) {
    const productData = JSON.parse(localStorage.getItem('products')).filter(
      (product) => product.productName === productName
    )[0];
    this.formData = productData.data || {};
    return productData;
  }

  private saveDraftToLocalStorage(drafts) {
    localStorage.setItem('myDrafts', JSON.stringify(drafts));
  }

  fetchProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  private saveProductsToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  saveAsDraft() {
    this.mode = this.route.url;
    if (Object.keys(this.formData).length === 0) {
      return;
    }
    const drafts = this.fetchDraftsFromLocalStorage();
    //Check if draft with same name exists
    const draftIndex = drafts.findIndex(
      (draft) => draft.draftName === this.formData.productDetails.productName
    );
    //if editing a draft then remove previous version
    if (this.mode.includes('edit-draft')) {
      drafts.splice(draftIndex, 1);
    } else {
      // create mode
      if (draftIndex > -1) {
        return;
      }
    }

    const newData = {
      lastEdited: moment(new Date()).format('MMMM D, YYYY'),
      draftName: this.formData.productDetails.productName,
      description: this.formData.productDetails.productDescription,
      category: this.formData.productDetails.category,
      data: this.formData,
      status: this.formData.productDetails.productStatus,
      documents: this.docList,
    };

    drafts.push(newData);
    this.saveDraftToLocalStorage(drafts);

    this.clearFormData();
  }

  submit({ startDate, effectiveDate, comments }) {
    if (Object.keys(this.formData).length === 0) {
      return;
    }

    const products = this.fetchProductsFromLocalStorage();
    const newData = {
      productName: this.formData.productDetails.productName,
      description: this.formData.productDetails.productDescription,
      submittedOn: moment(new Date()).format('MMMM D, YYYY'),
      submittedBy: JSON.parse(localStorage.getItem('user')).email,
      status: ProductStatus.pending,
      category: this.formData.productDetails.category,
      startDate: startDate,
      effectiveDate: effectiveDate,
      comments: comments,
      data: this.formData,
      documents: this.docList,
    };

    products.push(newData);
    this.saveProductsToLocalStorage(products);

    this.clearFormData();
  }

  deleteDraft(index) {
    const drafts = this.fetchDraftsFromLocalStorage();
    drafts.splice(index, 1);
    this.saveDraftToLocalStorage(drafts);
  }

  deleteProduct(index) {
    const products = this.fetchProductsFromLocalStorage();
    products.splice(index, 1);
    this.saveProductsToLocalStorage(products);
  }
}
