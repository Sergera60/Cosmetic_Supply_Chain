import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-final-stock',
  templateUrl: './final-stock.component.html',
  styleUrls: ['./final-stock.component.scss']
})
export class FinalStockComponent implements OnInit {
  finalStockForm!: FormGroup;
  submitted = false;
  prediction: number | null = null;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient , private inv:InventoryService , private router:Router) {}

  ngOnInit(): void {
    this.finalStockForm = this.fb.group({
  Stock_Entrant: [null, [Validators.required, Validators.min(0)]],
  Stock_Sortant: [null, [Validators.required, Validators.min(0)]],
  Produits_Endommages: [null, [Validators.required, Validators.min(0)]],
  capacity: [null, [Validators.required, Validators.min(0)]]
});
    const role = localStorage.getItem('role') || '';
    // get the role of the user
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin' && role !== 'inventory'){
         this.router.navigate(['/dashboard']);
       }
  }

  onSubmit(): void {
    this.submitted = true;
    this.prediction = null;
    this.errorMessage = '';

    if (this.finalStockForm.invalid) return;

    const formData = this.finalStockForm.value;
    const token = localStorage.getItem('token') || '';
    this.inv.getFinalStock(formData, token).subscribe(
      (response: any) => {
        this.prediction = response.prediction;
        this.errorMessage = '';
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while fetching the prediction.';
      }
    );

   
  }

  resetForm(): void {
    this.finalStockForm.reset();
    this.submitted = false;
    this.prediction = null;
    this.errorMessage = '';
  }

}
