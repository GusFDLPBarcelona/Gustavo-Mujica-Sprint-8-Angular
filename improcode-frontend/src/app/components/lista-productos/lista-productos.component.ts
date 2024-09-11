import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../servicios/productos.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Producto } from "../../interfaces/producto";
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";



@Component({
  selector: "app-lista-productos",
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent,],
  templateUrl: "./lista-productos.component.html",
  styleUrl: "./lista-productos.component.css"
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];
  loading: boolean = false;
  constructor(private productosService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {
    this.loading = true;
    this.productosService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      this.loading = false;
    });
  }

  eliminarProducto(id: number): void {
    this.loading = true;
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.getProductos();
    });
  }

  editarProducto(id: number, producto: Producto): void {
    console.log(id);
    this.productosService.editarProducto(id, producto).subscribe()
  }

  agregarProducto(): void {
    const nuevoProducto: Producto = {
      nombre: 'Nuevo Producto',
      descripcion: "",
      talla: "",
      precio: 0,
      stock: 0
    };
    this.productosService.agregarProducto(nuevoProducto).subscribe((producto: any) => {
      this.productos.push(producto);
    });
  }
}

