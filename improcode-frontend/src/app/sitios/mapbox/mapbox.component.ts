import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../servicios/mapbox.service';
import { Marker } from '../../interfaces/marker';

@Component({
    selector: 'app-mapbox',
    templateUrl: 'mapbox.component.html',
    styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

    map!: mapboxgl.Map;
    markers: Marker[] = [];
    existingMarkers: mapboxgl.Marker[] = [];

    goToLocation(lat: number, lng: number) {

        console.log(location)
        this.map.flyTo({
            center: [lng, lat],
            zoom: 14,
            essential: true
        });
    }

    predefinedLocations: Marker[] = [

        { name: 'Tienda NandoVivas, Urquinaona', latitude: 41.3851, longitude: 2.1734 },
        { name: 'Tienda NandoVivas, Eixample', latitude: 41.390205, longitude: 2.154007 },
        { name: 'Tienda NandoVivas, Barceloneta', latitude: 41.377491, longitude: 2.188996 },
        { name: 'Tienda NandoVivas, Sagrada Familia', latitude: 41.403629, longitude: 2.174356 },
        { name: 'Tienda NandoVivas, Tibidabo', latitude: 41.412275, longitude: 2.122964 },
        { name: 'Tienda NandoVivas, Rambla del Raval', latitude: 41.3794, longitude: 2.1686 },
        { name: 'Tienda NandoVivas, Santa María del Mar', latitude: 41.3833, longitude: 2.1816 }
    ];

    constructor(private mapboxService: MapboxService) { }

    ngOnInit(): void {

        this.initializeMap();

        this.map.on('load', () => {
            this.loadPredefinedLocations();


            this.map.on('click', (event) => {
                const { lng, lat } = event.lngLat;


                this.mapboxService.reverseGeocode(lng, lat).subscribe((response) => {
                    const placeName = response.features[0]?.place_name || 'Nuevo marcador';

                    const newMarker: Marker = {
                        name: placeName,
                        latitude: lat,
                        longitude: lng
                    };


                    const exists = this.markers.some(marker =>
                        Math.abs(marker.latitude - newMarker.latitude) < 0.0001 &&
                        Math.abs(marker.longitude - newMarker.longitude) < 0.0001
                    );


                    if (!exists) {
                        this.saveMarker(newMarker);
                        this.markers.push(newMarker);
                    }

                    this.addMarker(lat, lng, placeName);
                });
            });
        });
    }



    initializeMap() {

        (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2VqbWciLCJhIjoiY20xM3pvNjF5MTAzOTJqczFiOW16NDVwYSJ9.zAJksreKN7R6K2S2Q_41Cg';
        this.map = new mapboxgl.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [2.1734, 41.3851],
            zoom: 14
        });
    }


    loadPredefinedLocations() {

        this.markers = [...this.predefinedLocations];
        this.predefinedLocations.forEach(location => {
            this.addMarker(location.latitude, location.longitude, location.name);
        });
    }


    addMarker(lat: number, lng: number, name?: string) {

        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(this.map);

        if (name) {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);
            marker.setPopup(popup).togglePopup();
        }

        this.existingMarkers.push(marker);
    }


    saveMarker(marker: Marker) {

        this.mapboxService.createMarker(marker).subscribe({
            next: (response) => {
                console.log('Marcador guardado:', response);
            },
            error: (err) => {
                if (err.status === 400 && err.error.error === 'El marcador ya existe en la base de datos con esas coordenadas.') {
                    console.warn('Este marcador ya existe en la base de datos.');
                } else {
                    console.error('Error al guardar el marcador:', err);
                }
            }
        });
    }


    updateLocationList() {

        const locationList = document.getElementById('location-list');
        if (locationList) {
            locationList.innerHTML = '';


            this.predefinedLocations.forEach((location, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${location.name}: [${location.latitude}, ${location.longitude}]`;
                locationList.appendChild(li);
            });


            this.markers.forEach((location, index) => {
                const li = document.createElement('li');

                const placeName = location.name || 'Nuevo marcador';
                li.textContent = `${this.predefinedLocations.length + index + 1}. ${placeName}: [${location.latitude}, ${location.longitude}]`;
                locationList.appendChild(li);
            });
        }
    }
}
