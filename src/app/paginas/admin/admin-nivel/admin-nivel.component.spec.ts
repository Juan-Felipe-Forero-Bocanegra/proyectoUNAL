import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNivelComponent } from './admin-nivel.component';

describe('AdminNivelComponent', () => {
  let component: AdminNivelComponent;
  let fixture: ComponentFixture<AdminNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
