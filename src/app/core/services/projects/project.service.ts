import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<any>(this.url)
  }
}
