import { TestBed } from '@angular/core/testing';

import { GraduadosPosgradoService } from './graduados-posgrado.service';

describe('GraduadosPosgradoService', () => {
  let service: GraduadosPosgradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduadosPosgradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
