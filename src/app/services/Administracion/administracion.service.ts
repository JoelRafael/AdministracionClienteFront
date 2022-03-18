import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, startWith, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdministracionService {
  constructor(private http: HttpClient) {}
  obtenerempresa() {
    return this.http
      .get<any>(`${environment.apiUrl}/Administracion/GetAllEmpresa`)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  registrarempresa(data: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/Administracion/PostEmpresas`, data)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  obtenersexo() {
    return this.http
      .get<any>(`${environment.apiUrl}/Administracion/GetSexo`)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  obtenercliente() {
    return this.http
      .get<any>(`${environment.apiUrl}/Administracion/GetAllClientes`)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  obtenerdireccioncliente(id: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/Administracion/GetDireccionesClientes/${id}`
      )
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  actualizarcliente(data: any) {
    return this.http
      .put<any>(
        `${environment.apiUrl}/Administracion/PutClientes/${data.clienteId}`,
        data
      )
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  registrarcliente(data: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/Administracion/PostClientes`, data)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  nuevadireccion(data: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/Administracion/PostDireccionesClientes`,
        data
      )
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }
  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.error ? error.error : error.toTring();
    return throwError(errorMessage || 'Server Error Contact the Admin');
  }
}
