import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directiva } from '../api/directiva';

@Injectable({
  providedIn: 'root'
})
export class DirectivaService {

constructor(private http: HttpClient) { }

getDirectivas() {
  return this.http.get<Directiva[]>('http://localhost:8080/directivas/')
      .toPromise()
      .then(data => data);
}

addDirectiva(directiva: Directiva) {
  return this.http.post('http://localhost:8080/directivas/', directiva)
      .toPromise()
      .then(data => data);
}

updateDirectiva(directiva: Directiva) {
  const url = `http://localhost:8080/directivas/${directiva.codigo}`;
  return this.http.put(url, directiva)
      .toPromise()
      .then(data => data);
}

deleteDirectiva(directiva: Directiva) {
  const url = `http://localhost:8080/directivas/${directiva.codigo}`;
 
  return this.http.delete(url)
      .toPromise()
      .then(data => data);
} 

}
