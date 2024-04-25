import { TestBed } from '@angular/core/testing';

import { GlobalClickService } from './global-click.service';

describe('GlobalClickService', () => {
  let service: GlobalClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
