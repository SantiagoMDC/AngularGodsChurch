import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    
    correo: string = '';
    contrasena: string = '';
    
    constructor(private authService: AuthService, private router: Router) { }

    login() {
      console.log(this.correo);
      console.log(this.contrasena);
    }

    iniciarSesion(): void {
      if (this.authService.autenticar(this.correo, this.contrasena)) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/access']);
      }
    }
}
