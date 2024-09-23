import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private googleApiUrl = environment.endpoint;

  constructor(private http: HttpClient) { }

  authenticateAndSaveToken(token: string): Observable<any> {
    return this.http.post(`${this.googleApiUrl}/save-token`, { token });
  }

  exchangeCodeForToken(code: string): Observable<any> {
    return this.http.post(`${this.googleApiUrl}/oauth2callback`, { code });
  }
}
