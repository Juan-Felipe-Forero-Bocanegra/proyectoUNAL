import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesProgramaComponent } from './docentes-programa.component';

describe('DocentesProgramaComponent', () => {
  let component: DocentesProgramaComponent;
  let fixture: ComponentFixture<DocentesProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
