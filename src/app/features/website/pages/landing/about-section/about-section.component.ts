import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../../../../dashboard/dashboard-routing.module";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [DashboardRoutingModule , TranslateModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {

}
