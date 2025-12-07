import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { DashboardRoutingModule } from "../../../dashboard/dashboard-routing.module";
import { OurservicesService } from '../../../../core/services/our-services/ourservices.service';
import { Service } from '../../../../core/interfaces/service';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DashboardRoutingModule],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {
  services: Service[] = []
  url:string = 'https://realstatesaudi.runasp.net'
  lang:string = 'ar'
  constructor(private _services: OurservicesService) { }

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
    this._services.getAllServices().subscribe((res) => {
      this.services = res
    })


  }
}
