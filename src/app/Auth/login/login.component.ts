import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserRole } from '../../enums';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatInputModule, MatCardModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoginPage: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  users = [
    {
      email: 'adarsh@gmail.com',
      password: 'admin',
      role: UserRole.product
    },
    {
      email: 'madhav@gmail.com',
      password: 'admin',
      role: UserRole.actuary
    }
  ]
  constructor(private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.router.url.includes('login')) {
      this.isLoginPage = true;
      this.initializeLoginForm();
    } else if (this.router.url.includes('register')) {
      this.isLoginPage = false;
      this.initializeSignUpForm();
    }
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  initializeSignUpForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    })
  }

  login(){
    if(!this.loginForm.invalid){
      const userEmail = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      const user = this.users.find(item => item.email === userEmail && item.password === password);
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/main/dashboard'])
      }
    }
  }

  get loginEmail() { return this.loginForm.get('email'); }
  get loginPassword() { return this.loginForm.get('password'); }
  get registerEmail() { return this.registerForm.get('email'); }
  get registerPassword() { return this.registerForm.get('password'); }
  get registerFirstName() { return this.registerForm.get('firstName'); }
  get registerLastName() { return this.registerForm.get('lastName'); }

}
