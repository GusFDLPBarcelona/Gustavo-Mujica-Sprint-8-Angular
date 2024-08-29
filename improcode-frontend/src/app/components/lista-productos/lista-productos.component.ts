import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../servicios/productos.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Producto } from "../../interfaces/producto";


@Component({
  selector: "app-lista-productos",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./lista-productos.component.html",
  styleUrl: "./lista-productos.component.css"
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];
  constructor(private productosService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data: any) => {
      console.log(data);
      this.productos = data;
    });
  }

  eliminarProducto(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.productos = this.productos.filter((producto) => producto.id !== id);
    });
  }

  editarProducto(id: number, producto: Producto): void {
    console.log(id);
    this.productosService.editarProducto(id, producto).subscribe()
  }

  agregarProducto(): void {
    const nuevoProducto = { nombre: 'Nuevo Producto' };
    this.productosService.agregarProducto(nuevoProducto).subscribe((producto: any) => {
      this.productos.push(producto);
    });
  }
}

