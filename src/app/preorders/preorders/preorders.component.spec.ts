import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreordersComponent } from './preorders.component';

describe('PreordersComponent', () => {
  let component: PreordersComponent;
  let fixture: ComponentFixture<PreordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
