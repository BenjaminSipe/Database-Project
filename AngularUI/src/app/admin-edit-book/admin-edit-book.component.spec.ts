import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditBookComponent } from './admin-edit-book.component';

describe('AdminEditBookComponent', () => {
  let component: AdminEditBookComponent;
  let fixture: ComponentFixture<AdminEditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
