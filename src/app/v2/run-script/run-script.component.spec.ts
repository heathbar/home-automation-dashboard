import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunScriptComponent } from './run-script.component';

describe('RunScriptComponent', () => {
  let component: RunScriptComponent;
  let fixture: ComponentFixture<RunScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
