import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marcadores } from '../interfaces/marcadores';

@Injectable({
  providedIn: 'root'
})
export class MarcadoresService {

  private apiUrl = 'http://localhost:3000/api/markers';
  private defaultApiUrl = 'http://localhost:3000/api/defaultMarkers';



  constructor(private http: HttpClient) { }

  getMarcador(): Observable<Marcadores[]> {
    return this.http.get<Marcadores[]>(this.defaultApiUrl);
  }

  crearMarcador(marker: Marcadores): Observable<any> {
    return this.http.post<MarcadoresService>(this.apiUrl, marker);
  }

  deleteMarcadores(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/all`);
  }
}