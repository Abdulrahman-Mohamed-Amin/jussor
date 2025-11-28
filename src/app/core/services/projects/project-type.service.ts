import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

url:string = 'https://realstatesaudi.runasp.net/api/'
  constructor(private http:HttpClient) { }

  addProjecttype(data:any){
    return this.http.post(`${this.url}ProjectType` , data)
  }
  
  getALltype(){
    return this.http.get<any[]>(`${this.url}ProjectType`)
  }
  edittype(data:any){
    return this.http.put(`${this.url}ProjectType/${data.id}` , data)
  }
  deleteType(id:number){
    return this.http.delete(`${this.url}ProjectType/${id}`)
  }
}
