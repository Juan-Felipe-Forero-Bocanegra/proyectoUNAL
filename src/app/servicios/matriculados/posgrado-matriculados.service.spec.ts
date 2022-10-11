import { TestBed } from '@angular/core/testing';

import { PosgradoMatriculadosService } from './posgrado-matriculados.service';

describe('PosgradoMatriculadosService', () => {
  let service: PosgradoMatriculadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosgradoMatriculadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
