import { Injectable } from '@angular/core';
import { Chart } from '../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartsjsService {

  constructor() { }

  getChartData(): Chart[] {
    return [
      { label: 'Sitio A', value: 150 },
      { label: 'Sitio B', value: 250 },
      { label: 'Sitio C', value: 100 },
      { label: 'Sitio D', value: 300 }
    ];
  }
}
