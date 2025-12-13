import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/card/card.component";
import { Project } from '../../../../../core/interfaces/project';
import { ProjectService } from '../../../../../core/services/projects/project.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CardComponent , TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{
  projects:Project[] = []

  constructor(private _projectService:ProjectService){}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(){
    this._projectService.getAllProjects().subscribe((res) =>{
      this.projects = res
    })
    
  }
}
