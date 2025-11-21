import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../../features/dashboard/dashboard-routing.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DashboardRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  close:boolean = false
}
