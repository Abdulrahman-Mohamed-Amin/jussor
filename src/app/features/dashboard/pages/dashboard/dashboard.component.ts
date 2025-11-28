import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DashboardRoutingModule } from "../../dashboard-routing.module";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardRoutingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(){}

  
}
