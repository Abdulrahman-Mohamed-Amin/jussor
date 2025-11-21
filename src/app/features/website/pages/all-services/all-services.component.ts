import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {

}
