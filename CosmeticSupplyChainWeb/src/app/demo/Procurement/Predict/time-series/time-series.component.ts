import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcurementService } from 'src/app/services/MachineLearning/procurement.service'; // adjust path if needed
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent {

  forecastForm: FormGroup;
  submitted = false;
  forecastResults: any[] = [];
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private procurementService: ProcurementService ,private router: Router,) {}

  ngOnInit() {
    this.forecastForm = this.fb.group({
      steps: [null, Validators.required]  // Validate that steps are provided
    });
    const role = localStorage.getItem('role') || '';
    // get the role of the user
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin' && role !== 'procurment'){
         this.router.navigate(['/dashboard']);
       }
  }

  // Function to submit the form and get forecast data
  onSubmitForecast() {
    this.submitted = true;
    if (this.forecastForm.invalid) {
      return;
    }

    const steps = this.forecastForm.get('steps')?.value;
    const token = localStorage.getItem('token') || ''; // Replace with your actual token

    this.procurementService.getforcastDelayDays(steps, token).subscribe(
      (response: any) => {
        if (response.forecast && Array.isArray(response.forecast)) {
          this.forecastResults = response.forecast;
        } else {
          this.errorMessage = 'Failed to retrieve forecast data';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching the forecast data.';
      }
    );
  }
}
