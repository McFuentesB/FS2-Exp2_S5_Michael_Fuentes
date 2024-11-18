import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule para ngFor
import { of } from 'rxjs';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, CommonModule], // Importa el componente y CommonModule
      providers: [
        { provide: Router, useValue: router }  // Proporcionamos el router mockeado
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });

  it('debería mostrar la lista de habitaciones', () => {
    const roomElements = fixture.nativeElement.querySelectorAll('.card');
    expect(roomElements.length).toBe(component.rooms.length);  // Verifica que el número de habitaciones coincida
  });

  it('debería llamar a makeReservation y almacenar la reserva en localStorage', () => {
    spyOn(localStorage, 'setItem');  // Espía sobre el método setItem de localStorage
    const room = component.rooms[0];

    component.makeReservation(room);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'reservations',
      jasmine.any(String)  // Verifica que se llame a setItem con una cadena de texto
    );

    const reservationData = JSON.parse(localStorage.getItem('reservations') || '[]');
    expect(reservationData.length).toBe(1);  // Verifica que la reserva se haya añadido
    expect(reservationData[0].name).toBe(room.name);  // Verifica que el nombre de la habitación esté en la reserva
  });

  it('debería navegar al login al hacer logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Verifica que la redirección al login haya ocurrido
  });

  it('debería navegar al perfil al hacer goToPerfil', () => {
    component.goToPerfil();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);  // Verifica que la redirección al perfil haya ocurrido
  });
});
