import {TestBed} from '@angular/core/testing';

import {FormSchemaLoaderService} from './form-schema-loader.service';

describe('FormDataLoaderService', () => {
  let service: FormSchemaLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSchemaLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
