import { TestBed } from '@angular/core/testing';

import { ShareproductdataService } from './shareproductdata.service';

describe('ShareproductdataService', () => {
  let service: ShareproductdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareproductdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
