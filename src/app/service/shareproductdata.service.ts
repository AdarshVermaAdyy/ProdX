import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareproductdataService {

  public editDetails: any = [];
  public dataSubject = new BehaviorSubject(this.editDetails);
  currentData = this.dataSubject.asObservable();

  updateData(data: any) {
    console.log("data received in service from sender.... "+ data);
    this.dataSubject.next(data);
  }

  constructor() { }
}
