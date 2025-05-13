import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule , ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  token: string ; // Initialize token as null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      saveDetails: [true]
    });
  }

ngOnInit(): void {
  if (localStorage.getItem('token') != null) {
  this.token = localStorage.getItem('token'); // Get token from local storage
  this.userService.VerifyToken(this.token).subscribe(
    (response : any) => {
     if (response.valid) {
        this.router.navigate(['/dashboard']); // Redirect to dashboard if token is valid
      }
    }
  );
  this.token
}



}
  // Getters without explicit AbstractControl type
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get saveDetails() {
    return this.loginForm.get('saveDetails');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      saveDetails: this.loginForm.value.saveDetails
    };
    this.userService.loginUser(loginData.email, loginData.password).subscribe(
     //get token from the response and save it in local storage
      (response: any) => {
        const token = response.token; // Adjust based on your API response structure
        localStorage.setItem('token', token);
        const role = response.user.role; // Adjust based on your API response structure
        localStorage.setItem('role', role); // Save role in local storage
        this.router.navigate(['/dashboard']);
      },
      (error ) => {
      const errorMessage ='Login failed. Please try again.';
        alert( errorMessage);
      }     
    );
  
  }

  onResetPassword(): void {
    this.router.navigate(['/auth/reset-password']);
  }

}
