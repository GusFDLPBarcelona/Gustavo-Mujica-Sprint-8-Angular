import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marker } from '../interfaces/marker';

@Injectable({
    providedIn: 'root'
})
export class MapboxService {

    private apiUrl = 'http://localhost:4000/api/marcadores';
    private geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor(private http: HttpClient) { }

    getMarkers(): Observable<Marker[]> {
        return this.http.get<Marker[]>(this.apiUrl);
    }

    createMarker(marker: Marker): Observable<Marker> {
        return this.http.post<Marker>(this.apiUrl, marker);
    }

    deleteMarker(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    reverseGeocode(lng: number, lat: number): Observable<any> {
        const accessToken = 'pk.eyJ1IjoiZ2VqbWciLCJhIjoiY20xM3pvNjF5MTAzOTJqczFiOW16NDVwYSJ9.zAJksreKN7R6K2S2Q_41Cg';  // Reemplaza con tu token de Mapbox
        const url = `${this.geocodingUrl}/${lng},${lat}.json?access_token=${accessToken}`;
        return this.http.get(url);
    }
}
