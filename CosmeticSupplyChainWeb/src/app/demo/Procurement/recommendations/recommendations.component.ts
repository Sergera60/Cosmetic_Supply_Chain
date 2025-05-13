import { Component, OnInit } from '@angular/core';
import { ProcurementService } from 'src/app/services/MachineLearning/procurement.service'; // Import the service
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {
  recommendations: any[] = [];
  errorMessage: string | null = null;

  constructor(private procurementService: ProcurementService,private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role') || '';
   // get the role of the user
      console.log(role);
      // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
      if( role !== 'admin' && role !== 'procurment'){
        this.router.navigate(['/dashboard']);
      }
    this.fetchRecommendations();
  }

  // Fetch the recommendations from the backend
  fetchRecommendations() {
    const token = localStorage.getItem('token') || ''; // Replace with your actual token
    this.procurementService.getRecommendation(token).subscribe(
      (response: any[]) => {
        // Sort the recommendations based on the cosine similarity score in descending order
        this.recommendations = response
          .sort((a, b) => b.Cosine_Similarity_Score - a.Cosine_Similarity_Score) // Sorting by score
          .map((item, index) => ({
            rank: index + 1, // Ranking 1, 2, 3, ...
            productName: item.Product_Name,
            supplierName: item.Supplier_Name
          }));
      },
      (error) => {
        this.errorMessage = 'Failed to load recommendations';
      }
    );
  }
   productFilter: string = '';
  supplierFilter: string = '';

  filteredRecommendations() {
    return this.recommendations.filter(rec =>
      (!this.productFilter || rec.productName.toLowerCase().includes(this.productFilter.toLowerCase())) &&
      (!this.supplierFilter || rec.supplierName.toLowerCase().includes(this.supplierFilter.toLowerCase()))
    );
  }

}
