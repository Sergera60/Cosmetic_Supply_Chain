import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  submitted = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService // Inject your service
  ) {
    // Initialize the form with validators
    this.changePasswordForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator } // Custom validator for matching passwords
    );
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
 
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  // Getters for form controls
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.changePasswordForm.invalid) {
      alert('the password is not valid');
    }

    const newPassword = this.changePasswordForm.value.newPassword;

    this.userService.updateUserPassword(newPassword,localStorage.getItem('token')).subscribe(
      ()=>{
        this.successMessage = 'Password updated successfully';
        this.router.navigate(['/dashboard']);
      }

    );
 
  }


  

}
