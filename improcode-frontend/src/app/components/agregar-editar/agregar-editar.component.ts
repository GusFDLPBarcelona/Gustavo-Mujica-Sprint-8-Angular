import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
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
  loading: boolean = false;
  titulo = 'Agregar';

  constructor(private fb: FormBuilder, private productoService: ProductosService, private route: ActivatedRoute, private router: Router) {

    this.form = this.fb.group({

      id: [0],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      talla: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.route.data.subscribe((data: any) => {
      console.log(data.producto);
      this.form.patchValue(data.producto);
      if (this.form.value !== undefined) {
        console.log('entras? kullons!!');
        this.titulo = 'Editar';
      }
    })
  }

  agregarProducto() {

    const producto: Producto = this.form.value;

    if (producto.id !== 0) {

      this.productoService.editarProducto(producto.id!, producto).subscribe(data => {
        this.agregadoCorrectamente = data;
        this.router.navigate(['/']);
      });

    } else {

      this.productoService.agregarProducto(producto).subscribe(response => {
        this.agregadoCorrectamente = response;
        this.router.navigate(['/']);
      });
    }
  }
}

