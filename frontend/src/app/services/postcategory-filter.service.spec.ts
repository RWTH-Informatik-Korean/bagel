import { TestBed } from '@angular/core/testing';

import { PostcategoryFilterService } from './postcategory-filter.service';

describe('PostcategoryFilterService', () => {
  let service: PostcategoryFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostcategoryFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
