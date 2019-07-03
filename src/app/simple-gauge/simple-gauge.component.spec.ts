import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGaugeComponent } from './simple-gauge.component';

describe('SimpleGaugeComponent', () => {
  let component: SimpleGaugeComponent;
  let fixture: ComponentFixture<SimpleGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
