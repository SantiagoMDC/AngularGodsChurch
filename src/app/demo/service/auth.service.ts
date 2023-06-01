import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly correo = 'ipuc3@gmail.com';
  private readonly contrasena = '12345';
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

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
  getToken(): string {
    //@ts-ignore()
    return localStorage.getItem(this.tokenKey); // Obtener el token del localStorage
  }
  autenticar(correo: string, contrasena: string): boolean {
    return correo === this.correo && contrasena === this.contrasena;
  }
}
