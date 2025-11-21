import { Component } from '@angular/core';
import { ValuesComponent } from "../landing/values/values.component";
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ValuesComponent, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
