import { TestBed } from '@angular/core/testing';

import { HomeAssistantService } from './home-assistant.service';

describe('HomeAssistantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeAssistantService = TestBed.get(HomeAssistantService);
    expect(service).toBeTruthy();
  });
});
