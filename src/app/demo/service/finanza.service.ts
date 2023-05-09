import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Finanza } from '../api/finanza';

@Injectable()
export class FinanzaService {

    constructor(private http: HttpClient) { }

    
    getFinanzas() {
        return this.http.get<Finanza[]>('http://localhost:8080/finanzas/')
            .toPromise()
            .then(data => data);
    }

    addFinanza(finanza: Finanza) {
        return this.http.post('http://localhost:8080/finanzas/', finanza)
            .toPromise()
            .then(data => data);
    }

    updateFinanza(finanza: Finanza) {
        const url = `http://localhost:8080/finanzas/${finanza.codigo}`;
        return this.http.put(url, finanza)
            .toPromise()
            .then(data => data);
    }

    deleteFinanza(id: number) {
        const url = `http://localhost:8080/finanzas/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(data => data);
    }

}
