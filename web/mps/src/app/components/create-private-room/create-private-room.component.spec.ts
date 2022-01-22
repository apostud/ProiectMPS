import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivateRoomComponent } from './create-private-room.component';

describe('CreatePrivateRoomComponent', () => {
  let component: CreatePrivateRoomComponent;
  let fixture: ComponentFixture<CreatePrivateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrivateRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrivateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
