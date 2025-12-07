import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class OurservicesService {

  url:string = 'https://realstatesaudi.runasp.net/api/Service'
  constructor(private http:HttpClient) { }

  getAllServices(){
    return this.http.get<Service[]>(this.url)
  }
  addService(data:any){
    return this.http.post(this.url , data)
  }

  editService(id:number , data:any){
    return this.http.put(`${this.url}/${id}` , data)
  }

  deleteService(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
