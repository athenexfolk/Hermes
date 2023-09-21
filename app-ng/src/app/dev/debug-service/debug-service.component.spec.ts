import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugServiceComponent } from './debug-service.component';

describe('DebugServiceComponent', () => {
  let component: DebugServiceComponent;
  let fixture: ComponentFixture<DebugServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebugServiceComponent]
    });
    fixture = TestBed.createComponent(DebugServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
