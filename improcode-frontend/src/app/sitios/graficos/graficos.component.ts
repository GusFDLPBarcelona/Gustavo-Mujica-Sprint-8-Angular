import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  datos: any[] = [];
  chartBar: any;
  chartPie: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerDatos();
    Chart.register(...registerables);
  }

  obtenerDatos() {

    this.http.get<any[]>('http://localhost:4000/api/graficos')
      .subscribe(
        (response) => {
          this.datos = response;
          setTimeout(() => {
            this.generarGraficos();
          }, 0);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  generarGraficos() {

    const labels = this.datos.map(d => d.producto);
    const ventas = this.datos.map(d => d.ventas);
    const colores = this.generarColores(labels.length);

    if (this.chartBar) {
      this.chartBar.destroy();
    }
    if (this.chartPie) {
      this.chartPie.destroy();
    }

    const ctxBar = document.getElementById('canvasBar') as HTMLCanvasElement;
    if (ctxBar) {
      this.chartBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ventas',
              data: ventas,
              backgroundColor: colores,
              borderColor: colores,
              borderWidth: 1,
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    const ctxPie = document.getElementById('canvasPie') as HTMLCanvasElement;
    if (ctxPie) {
      this.chartPie = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ventas',
              data: ventas,
              backgroundColor: colores,
              borderColor: '#fff',
              borderWidth: 1,
            }
          ]
        }
      });
    }
  }

  generarColores(numeroDeColores: number): string[] {

    const colores = [];
    for (let i = 0; i < numeroDeColores; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
      colores.push(color);
    }
    return colores;
  }
}
