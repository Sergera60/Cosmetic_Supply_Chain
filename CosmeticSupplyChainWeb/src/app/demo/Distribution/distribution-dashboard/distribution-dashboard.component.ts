import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
@Component({
  selector: 'app-distribution-dashboard',
  templateUrl: './distribution-dashboard.component.html',
  styleUrls: ['./distribution-dashboard.component.scss']
})
export class DistributionDashboardComponent implements OnInit {
constructor(
       private route: ActivatedRoute,
       private router: Router,
       private userService: UserService
     ){
     }
  
  
     ngOnInit(): void {
      const role = localStorage.getItem('role') || '';
     // get the role of the user
        console.log(role);
        // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
        if( role !== 'admin' && role !== 'distribution'){
          this.router.navigate(['/dashboard']);
        }
        
  
  
     }
}
