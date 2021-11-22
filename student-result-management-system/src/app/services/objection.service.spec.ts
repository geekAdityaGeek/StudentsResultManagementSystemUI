import { TestBed } from '@angular/core/testing';

import { ObjectionService } from './objection.service';

describe('ObjectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectionService = TestBed.get(ObjectionService);
    expect(service).toBeTruthy();
  });
});
