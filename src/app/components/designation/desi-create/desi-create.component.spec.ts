import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiCreateComponent } from './desi-create.component';

describe('DesiCreateComponent', () => {
  let component: DesiCreateComponent;
  let fixture: ComponentFixture<DesiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
