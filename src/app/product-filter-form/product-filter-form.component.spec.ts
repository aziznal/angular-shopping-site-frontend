import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterFormComponent } from './product-filter-form.component';

describe('ProductFilterFormComponent', () => {
  let component: ProductFilterFormComponent;
  let fixture: ComponentFixture<ProductFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
