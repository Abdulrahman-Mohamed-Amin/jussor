import { Component, Input, OnInit } from '@angular/core';
import { DashboardRoutingModule } from "../../features/dashboard/dashboard-routing.module";
import { Project } from '../../core/interfaces/project';
import { LangService } from '../../core/services/language/lang.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DashboardRoutingModule , TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() project: Project | null = null;
  url: string = 'https://realstatesaudi.runasp.net'

  lang: string = ""

  constructor(private _lang: LangService) {
  }

  ngOnInit(): void {
    this._lang.currentLang$.subscribe(lang => {
      this.lang = lang;
    })
  }
}
