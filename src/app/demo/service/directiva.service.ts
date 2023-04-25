import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directiva } from '../api/directiva';

@Injectable({
  providedIn: 'root'
})
export class DirectivaService {

constructor(private http: HttpClient) { }

getDirectivas() {
  return this.http.get<any>('assets/demo/data/directivas.json')
      .toPromise()
      .then(res => res.data as Directiva[])
      .then(data => data);
}  

}
