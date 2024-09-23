import { Routes, } from "@angular/router";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { AgregarEditarComponent } from "./components/agregar-editar/agregar-editar.component";
import { editarProductoResolver } from "./editar-producto.resolver";
import { MapboxComponent } from "./sitios/mapbox/mapbox.component";
import { CalendarioComponent } from "./sitios/calendario/calendario.component";
import { GraficosComponent } from "./sitios/graficos/graficos.component";




export const routes: Routes = [
    { path: '', component: ListaProductosComponent },
    { path: 'sitios/graficos', component: GraficosComponent },
    { path: 'sitios/calendario', component: CalendarioComponent },
    { path: 'sitios/mapas', component: MapboxComponent },
    { path: 'agregar', component: AgregarEditarComponent },
    {
        path: 'editar/:id',
        component: AgregarEditarComponent,
        resolve: { producto: editarProductoResolver }
    },
];
