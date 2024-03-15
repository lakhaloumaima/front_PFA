import { TestBed } from '@angular/core/testing';

import { SubdomainResolverService } from './subdomain-resolver.service';

describe('SubdomainResolverService', () => {
  let service: SubdomainResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdomainResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
