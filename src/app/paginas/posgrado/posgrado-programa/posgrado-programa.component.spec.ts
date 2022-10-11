import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosgradoProgramaComponent } from './posgrado-programa.component';

describe('PosgradoProgramaComponent', () => {
  let component: PosgradoProgramaComponent;
  let fixture: ComponentFixture<PosgradoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosgradoProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosgradoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
