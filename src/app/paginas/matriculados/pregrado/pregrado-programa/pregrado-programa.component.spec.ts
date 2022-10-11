import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregradoProgramaComponent } from './pregrado-programa.component';

describe('PregradoProgramaComponent', () => {
  let component: PregradoProgramaComponent;
  let fixture: ComponentFixture<PregradoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregradoProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregradoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
