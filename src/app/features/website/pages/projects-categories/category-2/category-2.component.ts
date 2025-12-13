import { Component } from '@angular/core';
import { ProjectService } from '../../../../../core/services/projects/project.service';
import { Project } from '../../../../../core/interfaces/project';
import { FooterComponent } from "../../../../../shared/footer/footer.component";
import { HeaderComponent } from "../../../../../shared/header/header.component";
import { CardComponent } from "../../../../../shared/card/card.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-2',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CardComponent , TranslateModule],
  templateUrl: './category-2.component.html',
  styleUrl: './category-2.component.css'
})
export class Category2Component {
  projects: Project[] = []

  constructor(private _projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this._projectService.getAllProjects().subscribe(res => {
      console.log(res);
      this.projects = res.filter(proj => proj.projectType?.arName == 'مقاولات')
      console.log(this.projects);

    })
  }

}
