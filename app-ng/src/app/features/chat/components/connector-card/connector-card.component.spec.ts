import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorCardComponent } from './connector-card.component';

describe('ConnectorCardComponent', () => {
  let component: ConnectorCardComponent;
  let fixture: ComponentFixture<ConnectorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectorCardComponent]
    });
    fixture = TestBed.createComponent(ConnectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
