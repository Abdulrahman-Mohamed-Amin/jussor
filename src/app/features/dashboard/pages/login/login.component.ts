import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../../core/interfaces/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private _authService: AuthService ,private _toaster :ToastrService ,private router:Router) {
    _authService.getProjects().subscribe(res =>{
      console.log(res);
      
    })
  }

  sendData() {
    this._authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this._authService.svaeToken(res.token);
        this._toaster.success('المعلومات صحيحة')
        console.log(res);
      },
      error:(err) =>{
        this._toaster.error("خطأ في اسم المستخدم أو كلمة السر")
      },
      complete:() => {
        this.router.navigateByUrl('admin/dashboard')
      }
    });
  }
}
