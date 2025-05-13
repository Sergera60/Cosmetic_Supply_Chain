import { Component , OnInit } from '@angular/core';
import { User } from '../../../model/Users';
import { UserService } from 'src/app/services/User/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users!: User [];


  constructor( private userService : UserService ,private router: Router) {

  }
ngOnInit(): void {
  const token = localStorage.getItem('token') || '';

  this.userService.Profile(token).subscribe(
    // get the role of the user
     (Response: any) => {
       const role = Response.role;
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin'){
         this.router.navigate(['/dashboard']);
       }
       
     });

  this.getList();
}

getList(){
  this.userService.getUsers(localStorage.getItem('token')).subscribe(
    (response: any) => { //extract users from the response its double array
      this.users = response.users;
      console.log(this.users);
    }
      

    
    
  );
}



}
