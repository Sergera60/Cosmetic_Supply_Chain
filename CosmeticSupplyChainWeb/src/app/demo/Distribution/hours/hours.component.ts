import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DistributionService } from 'src/app/services/distribution.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  hoursForm!: FormGroup;
  predictedHours: number | null = null;

  deliveryCompanies = [
    'Aramex', 'JAX DELIVERY SERVICES', 'First Delivery', 'Best Delivery', 'Droppex', 'Trust Delivery', 'Mylerz'
  ];

  shippingAddresses = [
    "15 Avenue de la Paix, Sousse, Tunisia", "98 Rue de la Paix, Monastir, Tunisia", "16 Rue des Bougainvillées, Sousse, Tunisia",
    "12 Avenue du Cèdre, Sousse, Tunisia", "27 Rue des Dahlias, Hammamet, Tunisia", "66 Rue des Magnolias, Monastir, Tunisia",
    "29 Rue des Jasmins, Sousse, Tunisia", "41 Rue des Cyprès, Sfax, Tunisia", "75 Avenue des Mimosas, Hammamet, Tunisia",
    "23 Avenue Habib Maazoun, Sfax, Tunisia", "55 Rue El Mansourah, Sfax, Tunisia", "34 Rue des Bougainvillées, Sousse, Tunisia",
    "45 Avenue de la Liberté, Sfax, Tunisia", "34 Rue des Palmiers, Hammamet, Tunisia", "9 Rue Ibn Khaldoun, Tunis, Tunisia",
    "77 Rue Abou Kacem Chebbi, Tunis, Tunisia", "21 Rue des Érables, Tunis, Tunisia", "23 Avenue des Fleurs, Hammamet, Tunisia",
    "33 Rue des Lilas, Sfax, Tunisia", "78 Rue de la République, Monastir, Tunisia", "15 Avenue de la République, Sfax, Tunisia",
    "33 Avenue de l’Environnement, Sousse, Tunisia", "11 Rue Mohamed Ali, Sfax, Tunisia", "67 Avenue des Roses, Hammamet, Tunisia",
    "45 Avenue Farhat Hached, Sousse, Tunisia", "72 Avenue de la Liberté, Hammamet, Tunisia", "88 Rue des Cyprès, Tunis, Tunisia",
    "65 Rue des Jasmins, Hammamet, Tunisia", "22 Avenue des Magnolias, Sousse, Tunisia", "23 Avenue des Magnolias, Hammamet, Tunisia",
    "56 Rue du Lac, Monastir, Tunisia", "33 Rue de la Paix, Monastir, Tunisia", "19 Rue des Orangers, Tunis, Tunisia",
    "12 Avenue des Roses, Monastir, Tunisia", "23 Avenue de l’Indépendance, Tunis, Tunisia", "88 Rue Ali Belhouane, Sousse, Tunisia",
    "88 Rue de la Liberté, Monastir, Tunisia", "88 Avenue des Jasmins, Sfax, Tunisia", "32 Rue des Fleurs, Sfax, Tunisia",
    "15 Rue des Violettes, Hammamet, Tunisia", "67 Avenue des Roses, Tunis, Tunisia", "37 Avenue des Fleurs, Sfax, Tunisia",
    "45 Rue des Orangers, Monastir, Tunisia", "67 Rue des Lilas, Tunis, Tunisia", "78 Rue des Mimosas, Hammamet, Tunisia",
    "14 Rue des Lilas, Sfax, Tunisia", "11 Rue des Chênes, Tunis, Tunisia", "15 Rue des Cyprès, Hammamet, Tunisia",
    "27 Rue Hédi Nouira, Sfax, Tunisia", "18 Avenue des Lilas, Hammamet, Tunisia", "49 Avenue de l’Amitié, Hammamet, Tunisia",
    "12 Rue de la Liberté, Sfax, Tunisia", "18 Rue des Oiseaux, Tunis, Tunisia", "22 Rue des Bougainvillées, Sousse, Tunisia",
    "11 Rue de la République, Monastir, Tunisia", "15 Rue des Magnolias, Monastir, Tunisia", "50 Avenue de la Mer, Sousse, Tunisia",
    "89 Rue des Roses, Tunis, Tunisia", "56 Avenue des Jasmins, Hammamet, Tunisia", "25 Rue de l’Ambre, Sousse, Tunisia",
    "29 Rue des Bougainvillées, Sousse, Tunisia", "35 Rue de l’Aurore, Sfax, Tunisia", "45 Avenue de France, Sfax, Tunisia",
    "89 Avenue de la Liberté, Sousse, Tunisia", "18 Rue des Bougainvillées, Tunis, Tunisia", "88 Rue de la Victoire, Sousse, Tunisia",
    "34 Avenue des Fleurs, Monastir, Tunisia", "11 Avenue Ibn Sina, Tunis, Tunisia", "90 Rue Yasser Arafat, Sousse, Tunisia",
    "49 Rue des Roses, Monastir, Tunisia", "22 Avenue des Jasmins, Sfax, Tunisia", "56 Rue des Jasmins, Sfax, Tunisia",
    "55 Avenue des Lilas, Hammamet, Tunisia", "23 Avenue de Paris, Tunis, Tunisia", "33 Rue des Jasmins, Sfax, Tunisia",
    "34 Rue de la République, Monastir, Tunisia", "88 Rue des Jasmins, Sousse, Tunisia", "12 Avenue des Fleurs, Monastir, Tunisia",
    "78 Avenue des Myrtes, Hammamet, Tunisia", "44 Avenue de Paris, Tunis, Tunisia", "19 Rue de Carthage, Tunis, Tunisia",
    "67 Rue des Fleurs, Sousse, Tunisia", "67 Avenue des Oliviers, Hammamet, Tunisia", "78 Avenue des Mimosas, Hammamet, Tunisia",
    "98 Avenue de la Résistance, Monastir, Tunisia", "12 Rue de la République, Monastir, Tunisia", "22 Rue des Acacias, Hammamet, Tunisia",
    "16 Rue de l’Indépendance, Tunis, Tunisia", "67 Rue Mongi Slim, Monastir, Tunisia", "33 Rue des Orangers, Monastir, Tunisia",
    "12 Avenue des Tulipes, Monastir, Tunisia", "123 Rue Habib Bourguiba, Tunis, Tunisia", "78 Rue des Dahlias, Hammamet, Tunisia",
    "67 Avenue des Cyprès, Tunis, Tunisia", "12 Avenue Hédi Chaker, Sfax, Tunisia", "21 Avenue de la Paix, Monastir, Tunisia",
    "14 Rue des Amandiers, Sousse, Tunisia", "33 Avenue de la Paix, Sousse, Tunisia"
  ];

  numericFields = [
    { control: 'Distance_km', label: 'Distance (km)' },
    { control: 'Estimated_Time_Hours', label: 'Estimated Time (hours)' },
    { control: 'Price_TND', label: 'Price (TND)' },
    { control: 'Customer_Satisfaction_Score', label: 'Satisfaction Score (1–5)' },
    { control: '_Product_Damaged', label: 'Product Damaged Count' }
  ];

  constructor(private fb: FormBuilder,private dist:DistributionService ,private router: Router ) {}

  ngOnInit(): void {
   this.hoursForm = this.fb.group({
  Distance_km: [null, [Validators.required, Validators.min(0)]],
  Estimated_Time_Hours: [null, [Validators.required, Validators.min(0)]],
  Quantity: [20, [Validators.required, Validators.min(1)]],  // Assuming Quantity must be >= 1
  Price_TND: [null, [Validators.required, Validators.min(0)]],  // Price should not be negative
  Customer_Satisfaction_Score: [
    null,
    [Validators.required, Validators.min(1), Validators.max(5)]  // Score between 1 and 5
  ],
  _Product_Damaged: [null, [Validators.required, Validators.min(0)]],
  DeliveryCompany: ['', Validators.required],
  Order_ShippingAddress: ['', Validators.required]
});

    const role = localStorage.getItem('role') || '';
    // get the role of the user
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin' && role !== 'distribution'){
         this.router.navigate(['/dashboard']);
       }
  }
  

  onSubmitHours(): void {
    if (this.hoursForm.invalid) return;

    const formData = this.hoursForm.value;
    const token = localStorage.getItem('token') || '';
    console.log('Form Data:', formData);

   this.dist.getPredictionTime(formData, token).subscribe(
      (response: any) => {
        this.predictedHours = response.predicted_Real_Time_Hours;
        console.log('Predicted Hours:', this.predictedHours);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
   
  }
}
