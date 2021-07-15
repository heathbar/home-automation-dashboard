import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCurrentConditionsComponent } from './weather-current-conditions.component';

describe('WeatherCurrentConditionsComponent', () => {
  let component: WeatherCurrentConditionsComponent;
  let fixture: ComponentFixture<WeatherCurrentConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherCurrentConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCurrentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
