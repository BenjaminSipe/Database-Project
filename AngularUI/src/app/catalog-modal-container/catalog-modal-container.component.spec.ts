import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogModalContainerComponent } from './catalog-modal-container.component';

describe('CatalogModalContainerComponent', () => {
  let component: CatalogModalContainerComponent;
  let fixture: ComponentFixture<CatalogModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogModalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
