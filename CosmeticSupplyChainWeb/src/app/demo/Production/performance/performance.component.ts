import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProdutionService } from 'src/app/services/prodution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {


  performanceForm!: FormGroup;
  submitted = false;
  showResult = false;

  errorMessage = '';
  prediction: number | null = null;
  label: string = '';

  issueOptions: string[] = [
    'Minor wear', 'Loose bolts', 'Software glitch', 'None'
  ];

  reasonOptions: string[] = [
    'Mechanical Failure', 'Power Outage', 'Regular Maintenance', 'Software Issue'
  ];

  constructor(private fb: FormBuilder, private router:Router , private prod:ProdutionService) {}

  ngOnInit(): void {
    this.performanceForm = this.fb.group({
      price_zscore: ['', [Validators.required, Validators.min(0)]],
      Issues_Found: ['', Validators.required],
      Reason_x: ['', Validators.required]
    });
const role = localStorage.getItem('role');
    if( role !== 'admin' && role !== 'production'){
          this.router.navigate(['/dashboard']);
        }

  }

  onSubmit(): void {
     this.submitted = true;
    this.errorMessage = '';
    this.showResult = false;

    if (this.performanceForm.invalid) {
      return;
    }

    const formData = this.performanceForm.value;

    const token = localStorage.getItem('token');
  this.prod.getPerformance(formData, token!).subscribe(
      (response: any) => {

        this.prediction = response.prediction;
        this.label = response.label;
          this.showResult = true;

        this.showResult = true;
      }, (error: any) => {
        this.errorMessage = 'An error occurred while fetching the prediction. Please try again.';
        console.error('Error:', error);
      }
    
    
    
    );

  }

   resetForm(): void {
    this.performanceForm.reset();
    this.submitted = false;
    this.showResult = false;
    this.errorMessage = '';
    this.prediction = null;
    this.label = '';
  }


}
