import { Component } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListaProductosComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "improcode-frontend";
}
