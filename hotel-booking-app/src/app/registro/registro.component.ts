import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  birthdate: string = '';

  constructor(private router: Router) {}

  onRegister() {
    // Validar que todos los campos estén llenos
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Validar contraseñas iguales
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validar requisitos de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    if (!passwordRegex.test(this.password)) {
      alert(
        'La contraseña debe tener entre 6 y 18 caracteres, al menos un número y al menos una letra mayúscula.'
      );
      return;
    }

    // Validar edad mínima de 13 años
    const birthdate = new Date(this.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const isOldEnough =
      age > 13 || (age === 13 && today >= new Date(birthdate.getFullYear() + 13, birthdate.getMonth(), birthdate.getDate()));

    if (!isOldEnough) {
      alert('Debes tener al menos 13 años para registrarte.');
      return;
    }

    // Si todo es válido, guardar usuario en LocalStorage
    const user = { username: this.username, email: this.email, password: this.password, birthdate: this.birthdate };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registro exitoso');
    this.router.navigate(['/login']);
  }

  // Limpiar formulario
  clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.birthdate = '';
  }

  // Manejar entradas de texto
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'email') {
      this.email = inputElement.value;
    } else if (field === 'password') {
      this.password = inputElement.value;
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    } else if (field === 'birthdate') {
      this.birthdate = inputElement.value;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige al Login
  }
  
}
