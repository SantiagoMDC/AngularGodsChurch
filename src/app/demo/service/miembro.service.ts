import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Miembro } from '../api/miembro';

@Injectable()
export class MiembroService {

    constructor(private http: HttpClient) { }

    getMiembroSmall() {
        return this.http.get<any>('assets/demo/data/miembros.json')
            .toPromise()
            .then(res => res.data as Miembro[])
            .then(data => data);
    }

    getMiembros() {
        return this.http.get<any>('assets/demo/data/miembros.json')
            .toPromise()
            .then(res => res.data as Miembro[])
            .then(data => data);
    }

    postMiembro(miembro: Miembro) {
        return this.http.post<any>('assets/demo/data/miembros.json', miembro)
        .toPromise()
        .then(res => res.data as Miembro[])
        .then(data => data);
      }
      

    getMiembroMixed() {
        return this.http.get<any>('assets/demo/data/miembros.json')
            .toPromise()
            .then(res => res.data as Miembro[])
            .then(data => data);
    }

    getMiembroWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/miembros.json')
            .toPromise()
            .then(res => res.data as Miembro[])
            .then(data => data);
    }
}
