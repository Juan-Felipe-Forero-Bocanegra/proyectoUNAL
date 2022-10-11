import { TestBed } from '@angular/core/testing';

import { GraduadosPregradoService } from './graduados-pregrado.service';

describe('GraduadosPregradoService', () => {
  let service: GraduadosPregradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduadosPregradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
