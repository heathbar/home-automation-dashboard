import { TestBed } from '@angular/core/testing';

import { EnergyService } from './energy.service';

describe('EnergyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnergyService = TestBed.get(EnergyService);
    expect(service).toBeTruthy();
  });
});
