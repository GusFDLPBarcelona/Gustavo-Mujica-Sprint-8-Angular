import { Routes, } from "@angular/router";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { AgregarEditarComponent } from "./components/agregar-editar/agregar-editar.component";
import { editarProductoResolver } from "./editar-producto.resolver";




export const routes: Routes = [

    { path: '', component: ListaProductosComponent },
    { path: 'agregar', component: AgregarEditarComponent },
    {
        path: 'editar/:id',
        component: AgregarEditarComponent,
        resolve: { producto: editarProductoResolver }
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
