import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../shared/header/header.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { Project } from '../../../../core/interfaces/project';
import { LangService } from '../../../../core/services/language/lang.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-detils',
  standalone: true,
  imports: [HeaderComponent, FooterComponent , TranslateModule] ,
  templateUrl: './projects-detils.component.html',
  styleUrl: './projects-detils.component.css'
})
export class ProjectsDetilsComponent implements OnInit {

  project:Project | null = null
  id:string | null = ""
  lang:string = ""
  url:string = 'https://realstatesaudi.runasp.net'

  constructor(private router:ActivatedRoute , private _projects:ProjectService , private _lang:LangService ){}

  ngOnInit(){
      this.id = this.router.snapshot.paramMap.get('id');
      console.log(this.id);

      this.getProject()
      
      this._lang.currentLang$.subscribe(res =>{
        this.lang = res
      })

  }

  getProject(){
    this._projects.getAllProjects().subscribe(res =>{
      this.project = res.find(p => p.id.toString() == this.id) || null

      console.log(this.project);
      
    })
  }
}
