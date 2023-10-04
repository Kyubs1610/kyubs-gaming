import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfollowingComponent } from './dialogfollowing.component';

describe('DialogfollowingComponent', () => {
  let component: DialogfollowingComponent;
  let fixture: ComponentFixture<DialogfollowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogfollowingComponent]
    });
    fixture = TestBed.createComponent(DialogfollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
