import { TestBed } from '@angular/core/testing';

import { GETService } from './get.service';

describe('GETService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GETService = TestBed.get(GETService);
    expect(service).toBeTruthy();
  });
});
