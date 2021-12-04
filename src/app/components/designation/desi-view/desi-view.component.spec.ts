import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiViewComponent } from './desi-view.component';

describe('DesiViewComponent', () => {
  let component: DesiViewComponent;
  let fixture: ComponentFixture<DesiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
