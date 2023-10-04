import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfollowerComponent } from './dialogfollower.component';

describe('DialogfollowerComponent', () => {
  let component: DialogfollowerComponent;
  let fixture: ComponentFixture<DialogfollowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogfollowerComponent]
    });
    fixture = TestBed.createComponent(DialogfollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
