import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutionService {

  constructor(private http:HttpClient) { }

  apiUrl = 'http://localhost:5000';

  getPerformance(data : Peroformance, token :string){
    const headers = { 'Authorization': `${token}` };
    return this.http.post(`${this.apiUrl}/production/performance`, data, { headers });
  }
  

  getDelay(data : Delay, token :string){
    const headers = { 'Authorization': `${token}` };
    return this.http.post(`${this.apiUrl}/production/delay`, data, { headers });
  }

}


export class Peroformance{
price_zscore!:number;
Issues_Found!:string;
Reason_x!:string;
}

export class Delay{
  Categories!:string;
  Brand!:string;
  Price!:number;
}
