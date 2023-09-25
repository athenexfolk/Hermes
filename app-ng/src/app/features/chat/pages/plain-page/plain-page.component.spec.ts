import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainPageComponent } from './plain-page.component';

describe('PlainPageComponent', () => {
  let component: PlainPageComponent;
  let fixture: ComponentFixture<PlainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlainPageComponent]
    });
    fixture = TestBed.createComponent(PlainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
