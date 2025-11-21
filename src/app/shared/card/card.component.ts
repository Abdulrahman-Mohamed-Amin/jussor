import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../../features/dashboard/dashboard-routing.module";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DashboardRoutingModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
