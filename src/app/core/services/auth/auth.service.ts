import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../interfaces/auth';
import { Token } from '../../interfaces/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "https://realstatesaudi.runasp.net/api/Auth/login"
  url2: string = "https://realstatesaudi.runasp.net/api/Project"

  constructor(private http: HttpClient, private router: Router) { }

  login(data: Auth) {
    return this.http.post<Token>(this.url, data)
  }

  svaeToken(token: string) {
    sessionStorage.setItem('token', token)
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  isLogged() {
    return !!this.getToken()
  }
  logout() {
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('/admin/login')
  }

  getProjects() {
    return this.http.get(this.url2)
  }
}
