import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { AddUsers } from 'src/app/model/AddUsers'; // Adjust path as needed
import { User } from 'src/app/model/Users'; // Adjust path as needed

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {
  roles = ['distribution', 'inventory', 'procurment', 'production', 'admin'];
  addUserForm: FormGroup;
  updateUserForm: FormGroup;
  submitted = false;
  isUpdateMode = false;
  userId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.addUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    this.updateUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
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



    this.userId = this.route.snapshot.paramMap.get('id');
    this.isUpdateMode = !!this.userId;

    if (this.isUpdateMode && this.userId) {
      this.userService.getUserById(this.userId, token).subscribe(
        (response: User) => {
          this.updateUserForm.patchValue({
            email: response.email,
            role: response.role
          });
          this.updateUserForm.get('email')?.disable(); // Disable email in update mode
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.errorMessage = 'Failed to load user data: ' + error.message;
        }
      );
    }
  }

  // Getters for addUserForm
  get addEmail() { return this.addUserForm.get('email'); }
  get addPassword() { return this.addUserForm.get('password'); }
  get addRole() { return this.addUserForm.get('role'); }

  // Getters for updateUserForm
  get updateEmail() { return this.updateUserForm.get('email'); }
  get updateRole() { return this.updateUserForm.get('role'); }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;

    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.errorMessage = 'No authentication token found. Please log in.';
      return;
    }

    if (this.isUpdateMode && this.userId) {
      if (this.updateUserForm.invalid) {
        return;
      }
     this.userService.updateUserRole(this.userId, this.updateUserForm.value.role, token).subscribe(
      ()=> {
        alert('User updated successfully');
        this.router.navigate(['/list-users']);
      }
      );
    } else {
      if (this.addUserForm.invalid) {
        return;
      }
      const newUser: AddUsers = {
        email: this.addUserForm.value.email,
        password: this.addUserForm.value.password,
        role: this.addUserForm.value.role
      };
      this.userService.addUser(newUser, token).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/list-users']);
        },
        (error) => {
          console.error('Error adding user:', error);
          this.errorMessage = 'Failed to add user: ' + error.message;
        }
      );
    }
  }

  Navigate() :void {
    this.router.navigate(['/list-users']);
  }
}