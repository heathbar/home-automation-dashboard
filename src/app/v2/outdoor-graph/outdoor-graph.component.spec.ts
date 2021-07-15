import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdoorGraphComponent } from './outdoor-graph.component';

describe('OutdoorGraphComponent', () => {
  let component: OutdoorGraphComponent;
  let fixture: ComponentFixture<OutdoorGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdoorGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdoorGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
