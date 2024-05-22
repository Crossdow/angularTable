import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMainPageComponent } from './table-main-page.component';

describe('TableMainPageComponent', () => {
  let component: TableMainPageComponent;
  let fixture: ComponentFixture<TableMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableMainPageComponent]
    });
    fixture = TestBed.createComponent(TableMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
