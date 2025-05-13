import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http:HttpClient) { }

  apiUrl = 'http://localhost:5000';

  getRisqueLevel(data :Risque , token :string){
    const headers = { 'Authorization': `${token}` };
    return this.http.post(`${this.apiUrl}/inventory/risque`, data, { headers });
  }

  getFinalStock( data :FinalStock , token :string){
    const headers = { 'Authorization': `${token}` };
    return this.http.post(`${this.apiUrl}/inventory/final-stock`, data, { headers });
  }





}



export class Risque{
  Temperature!:number;
  Stock_Initial!:number;
  Stock_Entrant!:number;
  Stock_Sortant!:number;
}

export class FinalStock{
  Stock_Entrant!:number;
  Stock_Sortant!:number;
  Produits_Endommages!:number;
  capacity!:number;
}