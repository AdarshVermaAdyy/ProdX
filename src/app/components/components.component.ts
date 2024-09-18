import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent,CommonModule],
  templateUrl: './components.component.html',
})
export class Components {
  
}
