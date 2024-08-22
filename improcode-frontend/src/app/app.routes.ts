import { Routes, Router } from "@angular/router";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { AgregarEditarComponent } from "./components/agregar-editar/agregar-editar.component";




export const routes: Routes = [

    { path: '', component: ListaProductosComponent },
    { path: 'agregar', component: AgregarEditarComponent },
    { path: 'editar/:id', component: AgregarEditarComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },


];
