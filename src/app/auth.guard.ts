import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './demo/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // El usuario está autenticado, permite el acceso a la ruta solicitada
      return true;
    } else {
      // El usuario no está autenticado, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
