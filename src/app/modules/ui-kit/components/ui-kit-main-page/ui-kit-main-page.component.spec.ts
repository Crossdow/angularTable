import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKitMainPageComponent } from './ui-kit-main-page.component';

describe('UiKitMainPageComponent', () => {
  let component: UiKitMainPageComponent;
  let fixture: ComponentFixture<UiKitMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiKitMainPageComponent]
    });
    fixture = TestBed.createComponent(UiKitMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
