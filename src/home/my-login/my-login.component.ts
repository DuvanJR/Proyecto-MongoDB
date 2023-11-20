import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.scss'],
})
export class MyLoginComponent {
  public user: string = '';
  public password: string = '';
  public ValidarLogin = true;
  hide = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required]],
    });
    /* console.log(this.loginForm);
    console.log(this.user, this.password); */
  }

  login() {
    // Lógica de inicio de sesión
      this.router.navigate(['universtars/menu']);
  }
}
