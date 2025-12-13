import { Component } from '@angular/core';
import { OurservicesService } from '../../../../../core/services/our-services/ourservices.service';
import { Service } from '../../../../../core/interfaces/service';
import { CommonModule } from '@angular/common';
import { LangService } from '../../../../../core/services/language/lang.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  services: Service[] = []
  lang:string = ''
  icons:string[] = ['fa-solid fa-building', 'fa-solid fa-store' , 'fa-solid fa-store' , 'fa-solid fa-hotel' ,'fa-solid fa-microchip']
  constructor(private _services: OurservicesService , private _lang:LangService) { }

  ngOnInit(): void {
    this.getServices()

    this._lang.currentLang$.subscribe(lang =>{
        
    this.lang = lang;
    this.getServices(); // ✅ تحديث الداتا فورًا
    })
    
  }

  getServices() {
    this._services.getAllServices().subscribe((res) => {
      this.services = res
    })

    

  }

}
