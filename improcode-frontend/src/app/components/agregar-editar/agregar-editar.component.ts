import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Producto } from "../../interfaces/producto";
import { ProductosService } from "../../servicios/productos.service";

@Component({
  selector: "app-agregar-editar",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./agregar-editar.component.html",
  styleUrl: "./agregar-editar.component.css"
})
export class AgregarEditarComponent implements OnInit {
  form: FormGroup;
  agregadoCorrectamente: any;
  titulo = 'Agregar';

  constructor(private fb: FormBuilder, private productoService: ProductosService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      talla: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe(producto => {
      console.log(producto);
      this.form.patchValue(producto);
    })
  }

  agregarProducto() {
    const producto: Producto = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      talla: this.form.value.talla,
      precio: this.form.value.precio,
      stock: this.form.value.stock,
    }
    /*this.productoService.agregarProducto(producto).subscribe(response => {
      this.agregadoCorrectamente = response;
      console.log(response);
    })
  }*/
  }
}

