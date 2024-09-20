import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agenda } from '../interfaces/agenda';

@Injectable({
  providedIn: 'root'
})

export class EventosService {

  private apiUrl = 'http://localhost:4000/api/calendario';

  constructor(private http: HttpClient) { }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, eventData);
  }

  getEvents(): Observable<Agenda[]> {
    debugger
    return this.http.get<Agenda[]>(`${this.apiUrl}/`);
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

