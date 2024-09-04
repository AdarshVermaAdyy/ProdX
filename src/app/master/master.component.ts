import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../Layout/sidenav/sidenav.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent,CommonModule],
  templateUrl: './master.component.html',
})
export class MasterComponent {
  
}
