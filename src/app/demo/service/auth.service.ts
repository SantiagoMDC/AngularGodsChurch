import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly correo = 'ipuc3@gmail.com';
  private readonly contrasena = '12345';

  constructor(private http: HttpClient) { }

  login(user: any): Observable<string> {
    return this.http.post('https://reqres.in/api/login', user).pipe(
      map((response: any) => {
        // Aquí obtienes el token del backend
        const token = response.token;

        // Guardar el token en el almacenamiento local o de sesión según tus necesidades
        localStorage.setItem('token', token);

        return token;
      })
    );
  }

  autenticar(correo: string, contrasena: string): boolean {
    return correo === this.correo && contrasena === this.contrasena;
  }
}
