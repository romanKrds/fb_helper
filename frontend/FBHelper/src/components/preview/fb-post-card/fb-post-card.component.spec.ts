import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbPostCardComponent } from './fb-post-card.component';

describe('FbPostCardComponent', () => {
  let component: FbPostCardComponent;
  let fixture: ComponentFixture<FbPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
