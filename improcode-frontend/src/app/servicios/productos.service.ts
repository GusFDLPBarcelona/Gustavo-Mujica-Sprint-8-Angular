import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }


  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editarProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}


