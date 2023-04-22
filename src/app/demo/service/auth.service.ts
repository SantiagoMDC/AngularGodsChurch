import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly correo = 'ipuc3@gmail.com';
  private readonly contrasena = '12345';

  constructor() { }

  autenticar(correo: string, contrasena: string): boolean {
    return correo === this.correo && contrasena === this.contrasena;
  }
}
