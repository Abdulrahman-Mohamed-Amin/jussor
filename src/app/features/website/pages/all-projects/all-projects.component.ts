import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/card/card.component";
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { ProjectService } from '../../../../core/services/projects/project.service';
import { Project } from '../../../../core/interfaces/project';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CardComponent, HeaderComponent, FooterComponent , TranslateModule],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent implements OnInit{
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
