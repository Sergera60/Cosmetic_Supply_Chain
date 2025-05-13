import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private http:HttpClient) { }
  apiUrl = 'http://localhost:5000';

getPredictionTime(data : Reg, token :string){
  const headers = { 'Authorization': `${token}` };
  return this.http.post(`${this.apiUrl}/distribution/regression`, data, { headers });
}


getPredictionDefect(data : Defect, token :string){
  const headers = { 'Authorization': `${token}` };
  return this.http.post(`${this.apiUrl}/distribution/defect`, data, { headers });

}
}

export class Reg{
  Distance_km!:number;
  Estimated_Time_Hours!:number;
  Quantity!:number;
  Price_TND!:number;
  Customer_Satisfaction_Score!:number;
  _Product_Damaged!:number;
  DeliveryCompany!:string;
  Order_ShippingAddress!:string;
}


export class Defect {
  Price!: number;
  Average_Rating!: number;
  Sensible!:string;
  Stocker_sans_lumiere!:string;
  Temperature!:string;
  Size_Volume!:string;
  Brand!:string;
  Categorie!:string;
}