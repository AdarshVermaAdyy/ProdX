import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ShareproductdataService } from './service/shareproductdata.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent,CommonModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    ShareproductdataService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'prodx';
  isLoggedIn = true;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.router.navigate(['/auth/login'])
    }
  }

}
