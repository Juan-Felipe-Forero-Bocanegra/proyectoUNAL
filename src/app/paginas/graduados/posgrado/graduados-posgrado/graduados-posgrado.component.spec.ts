import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduadosPosgradoComponent } from './graduados-posgrado.component';

describe('GraduadosPosgradoComponent', () => {
  let component: GraduadosPosgradoComponent;
  let fixture: ComponentFixture<GraduadosPosgradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduadosPosgradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduadosPosgradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
