import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduadosPregradoProgramaComponent } from './graduados-pregrado-programa.component';

describe('GraduadosPregradoProgramaComponent', () => {
  let component: GraduadosPregradoProgramaComponent;
  let fixture: ComponentFixture<GraduadosPregradoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduadosPregradoProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduadosPregradoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
