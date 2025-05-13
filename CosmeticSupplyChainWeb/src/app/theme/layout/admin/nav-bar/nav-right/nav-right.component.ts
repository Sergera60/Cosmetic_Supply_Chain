import { Component , OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from 'src/app/services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent {
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId: boolean;
  email :String ;
  role :String ;

  constructor(config: NgbDropdownConfig, private userService: UserService ,
     private router: Router,
   ) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
  }


  changePassword(){
    this.router.navigate(['/change-password']); ;

  }


  ngOnInit(): void {
    this.userService.Profile(localStorage.getItem('token')).subscribe(
      //get the email and role from the object of the response
      (response : {email:string , role :string}) => {
       
        this.email = response.email;
        this.role = response.role;
      },
      
    );
  }
  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }
  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to the login page
    this.router.navigate(['/auth/signin']) ;
  }
}
