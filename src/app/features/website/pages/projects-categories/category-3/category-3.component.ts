import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../../shared/header/header.component";
import { FooterComponent } from "../../../../../shared/footer/footer.component";
import { CardComponent } from "../../../../../shared/card/card.component";
import { ProjectService } from '../../../../../core/services/projects/project.service';
import { Project } from '../../../../../core/interfaces/project';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-3',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent , TranslateModule],
  templateUrl: './category-3.component.html',
  styleUrl: './category-3.component.css'
})
export class Category3Component {
    projects:Project[] = []

  constructor(private _projectService:ProjectService){}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._projectService.getAllProjects().subscribe(res =>{
      console.log(res);
      this.projects = res.filter(proj => proj.projectType?.arName == 'إدارة المراكز التجارية')
      console.log(this.projects);
      
    })
  }
}
