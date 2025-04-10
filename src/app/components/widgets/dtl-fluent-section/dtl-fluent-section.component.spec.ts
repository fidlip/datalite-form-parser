import {ComponentFixture, TestBed} from '@angular/core/testing';

import DtlFluentSectionComponent from './dtl-fluent-section.component';

describe('DtlFluentSectionComponent', () => {
  let component: DtlFluentSectionComponent;
  let fixture: ComponentFixture<DtlFluentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtlFluentSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DtlFluentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
