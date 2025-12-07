import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
url:string = 'https://realstatesaudi.runasp.net/api/Project'
  constructor(private http:HttpClient) { }

  addProject(data:any){
    return this.http.post(this.url , data)
  }
  
  getAllProjects(){
    return this.http.get<Project[]>(this.url)
  }

  editProject(id:number , data:any){
    return this.http.put(this.url + `/${id}` , data)
  }

  deleteProject(id:number){
    return this.http.delete(this.url + `/${id}`)
  }
}
