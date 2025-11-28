import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../interfaces/auth';
import { Token } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 url:string = "https://realstatesaudi.runasp.net/api/Auth/login"
 url2:string = "https://realstatesaudi.runasp.net/api/Project"

  constructor(private http:HttpClient) { }

  login(data:Auth){
    return this.http.post<Token>(this.url , data)
  }

  svaeToken(token:string){
    localStorage.setItem('token' , token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLogged(){
    return !! this.getToken()
  }
  logout(){
    localStorage.removeItem('token')
  }

  getProjects(){
    return this.http.get(this.url2)
  }
}
