import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risque',
  templateUrl: './risque.component.html',
  styleUrls: ['./risque.component.scss']
})
export class RisqueComponent implements OnInit{
  risqueForm: FormGroup;
  risqueResult: any;

  constructor(private fb: FormBuilder, private inv: InventoryService , private router:Router) {}

  ngOnInit(): void {
    this.risqueForm = this.fb.group({
      Temperature: [0, Validators.required],
      Stock_Initial: [0, Validators.required],
      Stock_Entrant: [0, Validators.required],
      Stock_Sortant: [0, Validators.required]
    });
    const role = localStorage.getItem('role') || '';
    // get the role of the user
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin' && role !== 'inventory'){
         this.router.navigate(['/dashboard']);
       }

  }

  submitted = false;
  errorMessage: string = '';
  
  predictRisque(): void {
    const token = localStorage.getItem('token');
    this.submitted = true;
    if (this.risqueForm.valid) {
      this.inv.getRisqueLevel(this.risqueForm.value,token).subscribe(
        (result) => {
          this.risqueResult = result;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la prédiction.';
          console.error(error);
        }
      );
    }
  }
  
  resetForm(): void {
    this.risqueForm.reset();
    this.submitted = false;
    this.risqueResult = null;
  }

}
