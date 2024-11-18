import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inyecta el Router

  onLogin() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.username === this.username && storedUser.password === this.password) {
      console.log('Login exitoso');
      this.router.navigate(['/dashboard']); // Redirige al Dashboard
    } else {
      console.log('Usuario o contraseña incorrectos');
      alert('Usuario o contraseña incorrectos');
    }
  }

  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'password') {
      this.password = inputElement.value;
    }
  }
}
