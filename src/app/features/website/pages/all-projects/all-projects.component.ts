import { Component } from '@angular/core';
import { CardComponent } from "../../../../shared/card/card.component";
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CardComponent, HeaderComponent, FooterComponent],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent {

}
