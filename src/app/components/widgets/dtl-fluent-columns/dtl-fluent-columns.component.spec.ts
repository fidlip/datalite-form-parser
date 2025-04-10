import {ComponentFixture, TestBed} from '@angular/core/testing';

import DtlFluentColumnsComponent from './dtl-fluent-columns.component';

describe('DtlFluentColumnsComponent', () => {
  let component: DtlFluentColumnsComponent;
  let fixture: ComponentFixture<DtlFluentColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtlFluentColumnsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DtlFluentColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
