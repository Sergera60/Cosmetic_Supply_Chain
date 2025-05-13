import { TestBed } from '@angular/core/testing';

import { ProdutionService } from './prodution.service';

describe('ProdutionService', () => {
  let service: ProdutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
