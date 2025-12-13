import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../../core/interfaces/project';
import { ProjectService } from '../../../../../core/services/projects/project.service';
import { HeaderComponent } from "../../../../../shared/header/header.component";
import { CardComponent } from "../../../../../shared/card/card.component";
import { FooterComponent } from "../../../../../shared/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-1',
  standalone: true,
  imports: [HeaderComponent, CardComponent, FooterComponent , TranslateModule],
  templateUrl: './category-1.component.html',
  styleUrl: './category-1.component.css'
})
export class Category1Component implements OnInit{
  projects:Project[] = []

  constructor(private _projectService:ProjectService){}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._projectService.getAllProjects().subscribe(res =>{
      console.log(res);
      this.projects = res.filter(proj => proj.projectType?.arName == 'الأمن والسلامة')
      console.log(this.projects);
      
    })
  }
}
