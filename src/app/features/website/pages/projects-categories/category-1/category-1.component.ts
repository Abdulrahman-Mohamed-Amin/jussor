import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../../core/interfaces/project';
import { ProjectService } from '../../../../../core/services/projects/project.service';
import { HeaderComponent } from "../../../../../shared/header/header.component";
import { CardComponent } from "../../../../../shared/card/card.component";
import { FooterComponent } from "../../../../../shared/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '../../../../../core/services/language/lang.service';
import { MetaService } from '../../../../../core/services/meta-tags/meta.service';

@Component({
  selector: 'app-category-1',
  standalone: true,
  imports: [HeaderComponent, CardComponent, FooterComponent, TranslateModule],
  templateUrl: './category-1.component.html',
  styleUrl: './category-1.component.css'
})
export class Category1Component implements OnInit {
  projects: Project[] = []


  lang: string = ''
  currentType: any
  constructor(private _projectService: ProjectService, private _lang: LangService ,private seo:MetaService) { }

  ngOnInit(): void {
    this.getProjects()
    this._lang.currentLang$.subscribe(res => {
      this.lang = res

    })

    this.currentType = history.state.text;



  }
  

  getProjects() {
    this._projectService.getAllProjects().subscribe(res => {
      this.projects = res.filter(proj => proj.projectType?.arName == this.currentType.arName)
    })
  }

  
}
