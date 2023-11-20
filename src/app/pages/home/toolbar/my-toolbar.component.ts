import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.scss']
})
export class MyToolbarComponent {
  constructor(private router: Router) {}

  cerrarSesion() {
    // Lógica para cerrar la sesión del usuario
    this.router.navigate(['universtars/login']);
  }

}
