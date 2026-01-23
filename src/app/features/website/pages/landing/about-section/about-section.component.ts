import { Component, OnInit } from '@angular/core';
import { DashboardRoutingModule } from "../../../../dashboard/dashboard-routing.module";
import { TranslateModule } from '@ngx-translate/core';
import { ProjectTypeService } from '../../../../../core/services/projects/project-type.service';
import { Router } from '@angular/router';
import { LangService } from '../../../../../core/services/language/lang.service';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [DashboardRoutingModule , TranslateModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent implements OnInit {
lang:string = ''
  types:any[] = []
  constructor(private _projectTypes:ProjectTypeService , private router: Router , private _lanng:LangService){}

  ngOnInit(): void {
    this.getTypes()

    this._lanng.currentLang$.subscribe(res => {
      this.lang = res
    })
  }

  getTypes(){
    this._projectTypes.getALltype().subscribe(res => {
      this.types = res
      console.log(res);
    })
  }

  goToPage(type:any) {
  this.router.navigate(['/Security-Projects'], {
    state: { text: type }
  });
}
}
