import { TestBed, inject } from '@angular/core/testing';

import { MessageSocketsService } from './message-sockets.service';

describe('MessageSocketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageSocketsService]
    });
  });

  it('should ...', inject([MessageSocketsService], (service: MessageSocketsService) => {
    expect(service).toBeTruthy();
  }));
});
