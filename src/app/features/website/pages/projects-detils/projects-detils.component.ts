import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { Project } from '../../../../core/interfaces/project';

@Component({
  selector: 'app-projects-detils',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './projects-detils.component.html',
  styleUrl: './projects-detils.component.css'
})
export class ProjectsDetilsComponent implements OnInit {

  project:Project | null = null
  id:string | null = ""
  lang:string = "ar"
  url:string = 'https://realstatesaudi.runasp.net'

  constructor(private router:ActivatedRoute , private _projects:ProjectService){}

  ngOnInit(){
      this.id = this.router.snapshot.paramMap.get('id');
      console.log(this.id);

      this.getProject()
      
  }

  getProject(){
    this._projects.getAllProjects().subscribe(res =>{
      this.project = res.find(p => p.id.toString() == this.id) || null

      console.log(this.project);
      
    })
  }
}
