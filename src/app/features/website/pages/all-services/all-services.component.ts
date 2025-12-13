import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { DashboardRoutingModule } from "../../../dashboard/dashboard-routing.module";
import { OurservicesService } from '../../../../core/services/our-services/ourservices.service';
import { Service } from '../../../../core/interfaces/service';
import { LangService } from '../../../../core/services/language/lang.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DashboardRoutingModule , TranslateModule],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {
  services: Service[] = []
  url: string = 'https://realstatesaudi.runasp.net'
  lang: string = ''
  constructor(private _services: OurservicesService, private _lang: LangService) { }

  ngOnInit(): void {
    this.getServices()

    this._lang.currentLang$.subscribe(lang => {
      this.lang = lang;
    })
  }

  getServices() {
    this._services.getAllServices().subscribe((res) => {
      this.services = res
    })


  }
}
