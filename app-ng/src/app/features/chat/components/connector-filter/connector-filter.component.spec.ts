import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorFilterComponent } from './connector-filter.component';

describe('ConnectorFilterComponent', () => {
  let component: ConnectorFilterComponent;
  let fixture: ComponentFixture<ConnectorFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorFilterComponent]
    });
    fixture = TestBed.createComponent(ConnectorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
