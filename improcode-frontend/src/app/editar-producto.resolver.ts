import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductosService } from './servicios/productos.service';

export const editarProductoResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,) => {
  console.log(route.params['id']);
  debugger;
  return inject(ProductosService).obtenerPorId(route.params['id']);
};

