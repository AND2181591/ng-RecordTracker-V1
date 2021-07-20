import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheirWayComponent } from './on-their-way.component';

describe('OnTheirWayComponent', () => {
  let component: OnTheirWayComponent;
  let fixture: ComponentFixture<OnTheirWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnTheirWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTheirWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
