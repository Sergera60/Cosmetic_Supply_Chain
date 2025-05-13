import { Component ,OnInit} from '@angular/core';
import * as powerbi from 'powerbi-client';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
// Removed incorrect import statement

@Component({
  selector: 'app-procurementdashboard',
  templateUrl: './procurementdashboard.component.html',
  styleUrls: ['./procurementdashboard.component.scss']
})
export class ProcurementdashboardComponent implements OnInit {

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
      if( role !== 'admin' && role !== 'procurment'){
        this.router.navigate(['/dashboard']);
      }
      
   


   }





}
