import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartsjsService {
  private apiUrl = `${environment.endpoint}api/graficos`;

  constructor(private http: HttpClient) { }


  getGraficos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


  actualizarGrafico(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }


  eliminarGrafico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
