import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para redirección

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {} // Inyecta Router
  ngOnInit(): void {
    // Verifica si el entorno es el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.loadUser();
    }
  }

  // Cargar los datos del usuario desde LocalStorage
  loadUser() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.username) {
      this.username = storedUser.username;
      this.password = storedUser.password;
    }
  }

  // Guardar los cambios en los datos del usuario
  onUpdate() {
    if (this.password === this.confirmPassword) {
      const updatedUser = { username: this.username, password: this.password };
      // Verifica si el entorno es el navegador antes de acceder a localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Usuario actualizado exitosamente', updatedUser);
        alert('Usuario actualizado exitosamente');
      }
    } else {
      console.log('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
    }
  }

  // Capturar las entradas del formulario
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'password') {
      this.password = inputElement.value;
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    }
  }
  // Ir al Dashboard
  goToDashboard() {
    this.router.navigate(['/dashboard']); // Redirige al Dashboard
  }

  
}