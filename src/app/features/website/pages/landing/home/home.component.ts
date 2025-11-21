import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../../shared/header/header.component";
import { OurServicesComponent } from "../our-services/our-services.component";
import { HeroComponent } from "../hero/hero.component";
import { CardComponent } from "../../../../../shared/card/card.component";
import { ProjectsComponent } from "../projects/projects.component";
import { NewsComponent } from "../news/news.component";
import { FooterComponent } from "../../../../../shared/footer/footer.component";
import { AboutSectionComponent } from "../about-section/about-section.component";
import { ValuesComponent } from "../values/values.component";
import { ContactSecComponent } from "../contact-sec/contact-sec.component";
import { AdvantagesComponent } from "../advantages/advantages.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, OurServicesComponent, HeroComponent, CardComponent, ProjectsComponent, NewsComponent, FooterComponent, AboutSectionComponent, ValuesComponent, ContactSecComponent, AdvantagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
