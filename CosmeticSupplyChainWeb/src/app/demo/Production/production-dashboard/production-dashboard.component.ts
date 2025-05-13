import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
@Component({
  selector: 'app-production-dashboard',
  templateUrl: './production-dashboard.component.html',
  styleUrls: ['./production-dashboard.component.scss']
})
export class ProductionDashboardComponent implements OnInit {

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
        if( role !== 'admin' && role !== 'production'){
          this.router.navigate(['/dashboard']);
        }
        
  
  
     }


}
