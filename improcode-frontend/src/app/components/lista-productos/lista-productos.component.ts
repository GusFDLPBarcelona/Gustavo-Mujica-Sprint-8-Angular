import { Component, OnInit } from "@angular/core";
import { Productos } from "../../interfaces/productos";
import { ListaProductosService } from "../../servicios/productos.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-lista-productos",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./lista-productos.component.html",
  styleUrl: "./lista-productos.component.css"
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  listaProductos: Productos[] = [
    { id: 1, nombre: "T-Shirt", descripcion: "Print espalda", talla: "M", precio: 49, stock: 100 },
    { id: 2, nombre: "Gorra", descripcion: "Bordado frontal", talla: "única", precio: 35, stock: 210 },
    { id: 3, nombre: "Riñonera", descripcion: "Bordado Corazón", talla: "única", precio: 29, stock: 200 },
    { id: 4, nombre: "Cinturón", descripcion: "Bordado on fire", talla: "L", precio: 30, stock: 300 },
  ]

  constructor(private productosService: ListaProductosService, private router: Router) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data) => {
      console.log(data);
      this.productos = data;
    });
  }

  eliminarProducto(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.productos = this.productos.filter((producto) => producto.id !== id);
    });
  }

  agregarProducto(): void {
    const nuevoProducto = { nombre: 'Nuevo Producto' };
    this.productosService.agregarProducto(nuevoProducto).subscribe((producto) => {
      this.productos.push(producto);
    });
  }
}

