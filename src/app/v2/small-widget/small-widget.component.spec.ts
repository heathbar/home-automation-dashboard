import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallWidgetComponent } from './small-widget.component';

describe('SmallWidgetComponent', () => {
  let component: SmallWidgetComponent;
  let fixture: ComponentFixture<SmallWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
