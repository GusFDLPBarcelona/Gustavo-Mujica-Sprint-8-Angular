import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { AgregarEditarComponent } from "./components/agregar-editar/agregar-editar.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListaProductosComponent, AgregarEditarComponent, CommonModule, AppComponent, ReactiveFormsModule,],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "improcode-frontend";
}
