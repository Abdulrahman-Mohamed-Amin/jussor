import { Component } from '@angular/core';
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { HeaderComponent } from "../../../../shared/header/header.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, HeaderComponent , TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
