import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardRoutingModule } from "../../features/dashboard/dashboard-routing.module";
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '../../core/services/language/lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DashboardRoutingModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  close: boolean = false
  lang: string = ''
  constructor(private _language: LangService) { }

  ngOnInit(): void {
    this._language.currentLang$.subscribe(res => {
      this.lang = res
    })
  }
  isLoading: boolean = false;

  switcLang() {
    this.isLoading = true; // ⭐ إظهار اللودر

    this._language.switchLang();

    // ⭐ خلي اللودر ظاهر لحين التحميل ثم reload
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
