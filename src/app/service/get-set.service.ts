import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetService {

  data = {};

  constructor() { }

  set(key: string, data: any){
    this.data[key] = data;
  }

  get(key: string){
    return this.data[key];
  }
}
