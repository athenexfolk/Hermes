import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) {}

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    if (username && password && username.length && password.length) {
      this.authService.login(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      ).subscribe(res => {
        this.router.navigate(['/']);
      });
    }
  }
}
