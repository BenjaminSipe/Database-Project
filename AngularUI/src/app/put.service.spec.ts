import { TestBed } from '@angular/core/testing';

import { PUTService } from './put.service';

describe('PUTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PUTService = TestBed.get(PUTService);
    expect(service).toBeTruthy();
  });
});
