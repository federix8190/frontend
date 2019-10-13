import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class RestService {

    private urlTransacciones = environment.URL_BASE + 'transacciones';
    private urlDeudas = environment.URL_BASE + 'deudas';
    private urlResumenServicios = environment.URL_BASE + 'resumen-servicios';
    private urlServicios = environment.URL_BASE + 'servicios';
    private urlProcesarPago = environment.URL_BASE + 'pagos';

    constructor(private http: HttpClient) {
    }

    listarTransacciones(filtros: any): Observable<any> {
        return this.http.get(this.urlTransacciones, {params: filtros}).map(r => r);
    }

    listarDeudas(filtros: any): Observable<any> {
        return this.http.get(this.urlDeudas, {params: filtros}).map(r => r);
    }

    getServicios(): Observable<any> {
        return this.http.get(this.urlServicios).map(r => r);
    }

    resumenServicios(filtros: any): Observable<any> {
        return this.http.get(this.urlResumenServicios, {params: filtros}).map(r => r);
    }

    pagarDeuda(concurso: any): Observable<any> {
        return this.http.post(this.urlProcesarPago, concurso);
    }
    
}
