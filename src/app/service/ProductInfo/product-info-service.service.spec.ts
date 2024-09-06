import { TestBed } from '@angular/core/testing';

import { ProductInfoServiceService } from './product-info-service.service';

describe('ProductInfoServiceService', () => {
  let service: ProductInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
