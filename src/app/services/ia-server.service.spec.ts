import { TestBed } from '@angular/core/testing';

import { IaServerService } from './ia-server.service';

describe('IaServerService', () => {
  let service: IaServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IaServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
