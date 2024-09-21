import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Agenda } from '../interfaces/agenda';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiUrl = 'http://localhost:4000/api/calendario';

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/checkAuth`, { observe: 'response' }).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, eventData);
  }

  getEvents(headers?: HttpHeaders): Observable<any[]> {
    const options = headers ? { headers } : {}
    return this.http.get<any[]>(`${this.apiUrl}`, options);
  }

  getEventById(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}`);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`);
  }
}
