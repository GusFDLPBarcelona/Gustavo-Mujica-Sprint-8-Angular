import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { AgregarEditarComponent } from "./components/agregar-editar/agregar-editar.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListaProductosComponent, AgregarEditarComponent, CommonModule, AppComponent, ReactiveFormsModule, BrowserModule, AppComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "improcode-frontend";
}
