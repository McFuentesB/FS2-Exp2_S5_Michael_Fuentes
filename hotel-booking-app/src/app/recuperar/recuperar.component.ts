import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  standalone: true, // Especificamos que el componente es standalone
  imports: [CommonModule], // Agregamos CommonModule para usar directivas como *ngIf y *ngFor
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  userFound: boolean = false;

  constructor(private router: Router) {}

  // Manejar el ingreso del nombre de usuario
  onRecover(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.username === this.username) {
      console.log('Usuario encontrado:', this.username);
      this.userFound = true; // Cambiar al estado de restablecimiento de contraseña
    } else {
      console.log('Usuario no encontrado');
      alert('Usuario no encontrado');
    }
  }

  // Manejar el restablecimiento de contraseña
  onResetPassword(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (this.newPassword === this.confirmPassword) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.password = this.newPassword;
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Contraseña actualizada');
      alert('Contraseña restablecida con éxito');
      this.userFound = false;
      this.username = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

  // Manejar la entrada de datos en los campos
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'newPassword') {
      this.newPassword = inputElement.value;
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige al Login
  }
}
