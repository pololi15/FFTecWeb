import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cryptos } from './cryptos';

describe('Cryptos', () => {
  let component: Cryptos;
  let fixture: ComponentFixture<Cryptos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cryptos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cryptos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
