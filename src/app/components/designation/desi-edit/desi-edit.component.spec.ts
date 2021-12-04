import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiEditComponent } from './desi-edit.component';

describe('DesiEditComponent', () => {
  let component: DesiEditComponent;
  let fixture: ComponentFixture<DesiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
