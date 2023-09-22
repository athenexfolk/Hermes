import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPanelComponent } from './group-panel.component';

describe('GroupPanelComponent', () => {
  let component: GroupPanelComponent;
  let fixture: ComponentFixture<GroupPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPanelComponent]
    });
    fixture = TestBed.createComponent(GroupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
