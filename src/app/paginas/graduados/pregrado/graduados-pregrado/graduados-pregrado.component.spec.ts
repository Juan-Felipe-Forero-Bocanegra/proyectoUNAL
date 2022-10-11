import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduadosPregradoComponent } from './graduados-pregrado.component';

describe('GraduadosPregradoComponent', () => {
  let component: GraduadosPregradoComponent;
  let fixture: ComponentFixture<GraduadosPregradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduadosPregradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduadosPregradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
