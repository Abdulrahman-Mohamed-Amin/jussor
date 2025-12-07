import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url:string = 'https://realstatesaudi.runasp.net/api/News'
  constructor(private http:HttpClient) { }

  addNew(data:any){
    return this.http.post<any>(this.url , data)
  }

  getAllNews(){
    return this.http.get<News[]>(this.url)
  }

  editNew(id:number , data:any){
    return this.http.put(`${this.url}/${id}`,data)
  }

  deleteNew(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
