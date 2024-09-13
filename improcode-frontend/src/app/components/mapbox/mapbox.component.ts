import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MarcadoresService } from '../../servicios/marcadores.service';


@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.css'
})
export class MapboxComponent implements OnInit, OnDestroy {

  map!: mapboxgl.Map;
  predefinedMarkers: mapboxgl.Marker[] = [];
  dynamicMarkers: mapboxgl.Marker[] = [];
  allMarkers: mapboxgl.Marker[] = [];

  constructor(private _marcadoresService: MarcadoresService, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
      this.loadPredefinedMarkers();
    }

  }

  ngOnDestroy(): void {
    if (this.map) {
      this.clearDynamicMarkers();
    }


  }

  initializeMap(): void {
    mapboxgl.accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.1745004, 41.3907372],
      zoom: 12
    });

    this.map.on('click', (event: any) => {
      const { lng, lat } = event.lngLat;
      const newMarker: Marcadores = {
        longitude: lng,
        latitude: lat
      };
      const marker = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(this.map);
      this.dynamicMarkers.push(marker);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Dynamic Marker</h3><p>Coordinates: ${lng}, ${lat}</p>`)

      marker.setPopup(popup).togglePopup();




      this._marcadoresService.crearMarcador(newMarker).subscribe({
        next: (response: any) => {
          console.log('Marker saved successfully:', response);
        },
        error: (error: any) => {
          console.error('Error saving marker:', error);
        }
      });


    });
  }

  loadPredefinedMarkers() {
    this._marcadoresService.getMarcador().subscribe({
      next: (markers: Marcadores[]) => {
        this.allMarkers = markers;
        this.displayMarkers(markers);
      },
      error: (error: any) => {
        console.error('Error loading predefined markers:', error);
      }
    });
  }

  displayMarkers(markers: Marcadores[]) {
    markers.forEach(markerData => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';
      const marker = new mapboxgl.Marker()
        .setLngLat([markerData.longitude, markerData.latitude])
        .addTo(this.map);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${markerData.name}</h3><p>Coordinates: ${markerData.longitude}, ${markerData.latitude}</p><p>Category: ${markerData.category}</p>`
      );
      marker.setPopup(popup);
      marker.getElement().addEventListener('mouseenter', () => popup.addTo(this.map));
      marker.getElement().addEventListener('mouseleave', () => popup.remove());


      this.predefinedMarkers.push(marker);
    });
  }

  clearDynamicMarkers() {
    this.dynamicMarkers.forEach(marker => marker.remove());
    this.dynamicMarkers = [];
    this._marcadoresService.deleteMarcadores().subscribe({
      next: () => {
        console.log('All dynamic markers deleted successfully');
      },
      error: (error: any) => {
        console.error('Error deleting all markers:', error);
      }
    });
  }

}