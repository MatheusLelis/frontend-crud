import { TestBed } from '@angular/core/testing';

import { ListagemUsuariosService } from './listagem-usuarios.service';

describe('ListagemUsuariosService', () => {
  let service: ListagemUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListagemUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
