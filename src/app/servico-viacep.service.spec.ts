import { TestBed } from '@angular/core/testing';

import { ServicoVIACEPService } from './servico-viacep.service';

describe('ServicoVIACEPService', () => {
  let service: ServicoVIACEPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoVIACEPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
