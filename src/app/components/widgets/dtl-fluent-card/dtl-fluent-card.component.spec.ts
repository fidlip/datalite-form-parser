import {ComponentFixture, TestBed} from '@angular/core/testing';

import DtlFluentCardComponent from './dtl-fluent-card.component';

describe('DtlFluentCardComponent', () => {
  let component: DtlFluentCardComponent;
  let fixture: ComponentFixture<DtlFluentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtlFluentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DtlFluentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
