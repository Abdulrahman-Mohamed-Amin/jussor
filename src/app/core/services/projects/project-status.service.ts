import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {
url:string = 'https://realstatesaudi.runasp.net/api/'
  constructor(private http:HttpClient) { }

  addProjectStatus(data:any){
    return this.http.post(`${this.url}ProjectStatus` , data)
  }
  
  getALlStatus(){
    return this.http.get<any[]>(`${this.url}ProjectStatus`)
  }
  editStatus(data:any){
    return this.http.put(`${this.url}ProjectStatus/${data.id}` , data)
  }
  deleteStatus(id:number){
    return this.http.delete(`${this.url}ProjectStatus/${id}`)
  }
}
