import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Finanza } from '../api/finanza';

@Injectable()
export class FinanzaService {

    constructor(private http: HttpClient) { }

    
    getFinanzas() {
        return this.http.get<any>('assets/demo/data/finanzas.json')
            .toPromise()
            .then(res => res.data as Finanza[])
            .then(data => data);
    }

}
