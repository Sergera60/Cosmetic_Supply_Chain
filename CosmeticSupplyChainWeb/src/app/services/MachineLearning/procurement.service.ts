import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})





export class ProcurementService {

  constructor(private http:HttpClient) { }

  apiUrl = 'http://localhost:5000';


 getProbabilityofDelay(data :SVC_RF , token :string){
  const headers = { 'Authorization': `${token}` };
  return this.http.post(`${this.apiUrl}/svc`, data, { headers });
  }

  getPredictDelayDays(data :SVC_RF , token :string){
    const headers = { 'Authorization': `${token}` };
    return this.http.post(`${this.apiUrl}/rf`, data, { headers });
    }
   
    getforcastDelayDays(steps: number , token: string) {
      const headers = { 'Authorization': token };
      return this.http.post(`${this.apiUrl}/sarima`, {steps},{ headers });
    }

    getRecommendation(token: string) {
      const headers = { 'Authorization': token };
      return this.http.get(`${this.apiUrl}/recommendations`, { headers });
    }



}
export class SVC_RF{
  Quantity!:number;
  Supplier_avg_delay!:number;
  Price__USD_per_unit!:number;
  Delay_Cause!:string;
}

