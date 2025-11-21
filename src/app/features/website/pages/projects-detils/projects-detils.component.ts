import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-projects-detils',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './projects-detils.component.html',
  styleUrl: './projects-detils.component.css'
})
export class ProjectsDetilsComponent {

}
