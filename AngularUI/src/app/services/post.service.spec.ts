import { TestBed } from '@angular/core/testing';

import { POSTService } from './post.service';

describe('POSTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POSTService = TestBed.get(POSTService);
    expect(service).toBeTruthy();
  });
});
