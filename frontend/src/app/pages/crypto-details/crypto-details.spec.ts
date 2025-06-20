import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoDetails } from './crypto-details';

describe('CryptoDetails', () => {
  let component: CryptoDetails;
  let fixture: ComponentFixture<CryptoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
