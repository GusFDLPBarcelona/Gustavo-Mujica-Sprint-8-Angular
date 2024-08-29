import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { editarProductoResolver } from './editar-producto.resolver';

describe('editarProductoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => editarProductoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
