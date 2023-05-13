import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Miembro } from '../api/miembro';

@Injectable()
export class MiembroService {

    constructor(private http: HttpClient) { }


    getMiembros() {
        return this.http.get<Miembro[]>('http://localhost:8080/miembros/')
            .toPromise()
            .then(data => data);
    }

    addMiembro(miembro: Miembro) {
        return this.http.post('http://localhost:8080/miembros/', miembro)
            .toPromise()
            .then(data => data);
    }

    updateMiembro(miembro: Miembro) {
        const url = `http://localhost:8080/miembros/${miembro.identificacion}`;
        return this.http.put(url, miembro)
            .toPromise()
            .then(data => data);
    }

    deleteMiembro(miembro: Miembro) {
        const url = `http://localhost:8080/miembros/${miembro.identificacion}`;
       
        return this.http.delete(url)
            .toPromise()
            .then(data => data);
    }
}
