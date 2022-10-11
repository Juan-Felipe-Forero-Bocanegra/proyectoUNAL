import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduadosPosgradoProgramaComponent } from './graduados-posgrado-programa.component';

describe('GraduadosPosgradoProgramaComponent', () => {
  let component: GraduadosPosgradoProgramaComponent;
  let fixture: ComponentFixture<GraduadosPosgradoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduadosPosgradoProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduadosPosgradoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
