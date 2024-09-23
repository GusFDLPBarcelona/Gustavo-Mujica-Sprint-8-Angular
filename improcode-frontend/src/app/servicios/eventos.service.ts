import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:4000/api/calendario';

  constructor(private http: HttpClient) { }

  // Obtener todos los eventos
  getEvents(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}` // Incluye el token de acceso en la cabecera
    });
    return this.http.get(`${this.apiUrl}/events`, { headers });
  }

  // Crear un nuevo evento
  createEvent(eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}` // Incluye el token de acceso en la cabecera
    });
    return this.http.post(`${this.apiUrl}/create-event`, eventData, { headers });
  }

  // Editar un evento por ID
  updateEvent(id: string, eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}` // Incluye el token de acceso en la cabecera
    });
    return this.http.put(`${this.apiUrl}/events/${id}`, eventData, { headers });
  }

  // Eliminar un evento por ID
  deleteEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}` // Incluye el token de acceso en la cabecera
    });
    return this.http.delete(`${this.apiUrl}/events/${id}`, { headers });
  }
}
