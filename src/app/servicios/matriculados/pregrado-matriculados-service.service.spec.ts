import { TestBed } from '@angular/core/testing';

import { PregradoMatriculadosServiceService } from './pregrado-matriculados-service.service';

describe('PregradoMatriculadosServiceService', () => {
  let service: PregradoMatriculadosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregradoMatriculadosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
