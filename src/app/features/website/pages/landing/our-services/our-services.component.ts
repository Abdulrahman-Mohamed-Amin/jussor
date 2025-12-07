import { Component } from '@angular/core';
import { OurservicesService } from '../../../../../core/services/our-services/ourservices.service';
import { Service } from '../../../../../core/interfaces/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  services: Service[] = []
  lang:string = 'ar'
  icons:string[] = ['fa-solid fa-building', 'fa-solid fa-store' , 'fa-solid fa-store' , 'fa-solid fa-hotel' ,'fa-solid fa-microchip']
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
