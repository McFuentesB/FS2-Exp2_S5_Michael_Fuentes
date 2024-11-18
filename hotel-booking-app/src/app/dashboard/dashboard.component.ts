import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router para redirección

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Importamos CommonModule para usar ngFor
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  rooms = [
    { id: 1, name: 'Habitación 101', description: 'Habitación con vista al mar', price: 100 },
    { id: 2, name: 'Habitación 102', description: 'Habitación con vista al jardín', price: 80 },
    { id: 3, name: 'Habitación 103', description: 'Habitación estándar', price: 60 }
  ];

  constructor(private router: Router) {} // Inyecta Router

  // Método para realizar la reserva
  makeReservation(room: any) {
    if (!room || !room.name) {
      alert('Error: Datos de la habitación no encontrados.');
      return;
    }

    // Mostrar alerta con el nombre de la habitación
    alert(`Reserva realizada para: ${room.name}`);

    // Obtener reservas actuales del LocalStorage
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');

    // Agregar la nueva reserva
    const newReservation = {
      id: room.id,
      name: room.name,
      description: room.description,
      price: room.price,
      reservedAt: new Date().toISOString(), // Fecha de reserva
    };

    // Guardar la lista actualizada de reservas en el LocalStorage
    localStorage.setItem('reservations', JSON.stringify([...storedReservations, newReservation]));
  }

  // Método para cerrar sesión
  logout() {
    this.router.navigate(['/login']); // Redirige al login
  }

   // Ir al Perfil
   goToPerfil() {
    this.router.navigate(['/perfil']); // Redirige al Perfil
  }
}
