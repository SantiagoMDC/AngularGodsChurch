import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginComponent } from '../components/auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly correo = 'ipuc3@gmail.com';
  private readonly contrasena = '12345';
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient,
    private router:Router) { }

  login(user: any): Observable<string> {
    return this.http.post('http://localhost:8080/generate-token', user).pipe(
      map((response: any) => {
        // Aquí obtienes el token del backend
        const token = response.token;

        // Guardar el token en el almacenamiento local o de sesión según tus necesidades
        localStorage.setItem('Authorization', `Bearer ${token}`);


        return token;
      })
    );
  }
  isLoggedIn(): boolean {
    // Verificar si el token existe en el localStorage o si hay alguna lógica de autenticación
    const token = localStorage.getItem('Authorization');;
    return !!token; // Devuelve true si el token existe, false en caso contrario
  }
  getToken(): string {
    //@ts-ignore()
    return localStorage.getItem(this.tokenKey); // Obtener el token del localStorage
  }
  autenticar(correo: string, contrasena: string): boolean {
    return correo === this.correo && contrasena === this.contrasena;
  }



}
