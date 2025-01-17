import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSendComponent } from './confirm-send.component';

describe('ConfirmSendComponent', () => {
  let component: ConfirmSendComponent;
  let fixture: ComponentFixture<ConfirmSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmSendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
