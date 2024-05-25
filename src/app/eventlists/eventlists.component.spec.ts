import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlistsComponent } from './eventlists.component';

describe('EventlistsComponent', () => {
  let component: EventlistsComponent;
  let fixture: ComponentFixture<EventlistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventlistsComponent]
    });
    fixture = TestBed.createComponent(EventlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
