import { TestBed } from '@angular/core/testing';

import { GeminiWebsocket } from './gemini-websocket';

describe('GeminiWebsocket', () => {
  let service: GeminiWebsocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiWebsocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
