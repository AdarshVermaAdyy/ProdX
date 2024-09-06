import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {  Router, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  isLoginPage : boolean = true;
  loginForm : FormGroup;
  registerForm : FormGroup;
  constructor(private router : Router,private fb : FormBuilder){
  }

  ngOnInit(): void {
 if(this.router.url.includes('login')){
  this.isLoginPage =true;
  this.initializeLoginForm();
 }else if(this.router.url.includes('register')){
  this.isLoginPage =false;
  this.initializeSignUpForm();
 }
  }

  initializeLoginForm(){
    this.loginForm = this.fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }
  initializeSignUpForm(){
    this.registerForm = this.fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
    })
  }

  get loginEmail(){ return this.loginForm.get('email');}
  get loginPassword(){ return this.loginForm.get('password');}
  get registerEmail(){ return this.registerForm.get('email');}
  get registerPassword(){ return this.registerForm.get('password');}
  get registerFirstName(){ return this.registerForm.get('firstName');}
  get registerLastName(){ return this.registerForm.get('lastName');}

}
