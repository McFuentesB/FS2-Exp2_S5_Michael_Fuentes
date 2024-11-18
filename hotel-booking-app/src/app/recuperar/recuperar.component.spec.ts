import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarComponent } from './recuperar.component';
import { Router } from '@angular/router';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    // TestBed sin NgModule ni imports, solo el componente
    await TestBed.configureTestingModule({
      providers: [
        RecuperarComponent, // Directamente el componente que queremos probar
        { provide: Router, useValue: router },  // Mock del router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });

  it('debería cambiar el estado a "userFound" al encontrar al usuario', () => {
    // Mock de localStorage
    const storedUser = { username: 'testUser', password: 'testPassword' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUser));

    component.username = 'testUser';  // Simula el nombre de usuario ingresado

    component.onRecover(new Event('submit'));  // Llamamos al método onRecover

    expect(component.userFound).toBeTrue();  // Verifica que el estado se haya actualizado
  });

  it('debería mostrar un error si el usuario no se encuentra', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{}');  // Simula la ausencia de un usuario en el localStorage
    spyOn(window, 'alert');  // Espía sobre la función alert

    component.username = 'nonExistentUser';  // Simula el nombre de usuario ingresado

    component.onRecover(new Event('submit'));  // Llamamos al método onRecover

    expect(window.alert).toHaveBeenCalledWith('Usuario no encontrado');  // Verifica que se haya mostrado el mensaje de error
  });

  it('debería restablecer la contraseña si las contraseñas coinciden', () => {
    const storedUser = { username: 'testUser', password: 'testPassword' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUser));  // Simula la carga del usuario
    spyOn(localStorage, 'setItem');  // Espía sobre localStorage.setItem
    spyOn(window, 'alert');  // Espía sobre la función alert

    // Simula la entrada de las contraseñas
    component.username = 'testUser';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword';

    component.onResetPassword(new Event('submit'));  // Llamamos al método onResetPassword

    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({
      username: 'testUser',
      password: 'newPassword'
    }));
    expect(window.alert).toHaveBeenCalledWith('Contraseña restablecida con éxito');
    expect(component.userFound).toBeFalse();  // Verifica que el estado vuelva a "false"
    expect(component.username).toBe('');
    expect(component.newPassword).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('debería mostrar un error si las contraseñas no coinciden al restablecer la contraseña', () => {
    spyOn(window, 'alert');  // Espía sobre la función alert

    // Simula contraseñas que no coinciden
    component.newPassword = 'newPassword';
    component.confirmPassword = 'differentPassword';

    component.onResetPassword(new Event('submit'));  // Llamamos al método onResetPassword

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');  // Verifica que se haya mostrado el mensaje de error
  });

  it('debería redirigir al login cuando se haga clic en el botón "Volver atrás"', () => {
    component.goToLogin();  // Llamamos al método goToLogin

    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Verifica que la navegación ocurra
  });

  it('debería almacenar los valores del formulario en las propiedades del componente al escribir en los campos', () => {
    // Simula la escritura en los campos
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = 'testUser';
    usernameInput.dispatchEvent(new Event('input'));

    const newPasswordInput = fixture.nativeElement.querySelector('#newPassword');
    newPasswordInput.value = 'newPassword';
    newPasswordInput.dispatchEvent(new Event('input'));

    const confirmPasswordInput = fixture.nativeElement.querySelector('#confirmPassword');
    confirmPasswordInput.value = 'newPassword';
    confirmPasswordInput.dispatchEvent(new Event('input'));

    expect(component.username).toBe('testUser');
    expect(component.newPassword).toBe('newPassword');
    expect(component.confirmPassword).toBe('newPassword');
  });
});
