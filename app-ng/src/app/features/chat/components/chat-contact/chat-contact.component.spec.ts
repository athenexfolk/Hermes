import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContactComponent } from './chat-contact.component';

describe('ChatContactComponent', () => {
  let component: ChatContactComponent;
  let fixture: ComponentFixture<ChatContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatContactComponent]
    });
    fixture = TestBed.createComponent(ChatContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
