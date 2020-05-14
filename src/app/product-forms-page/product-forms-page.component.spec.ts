import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormsPageComponent } from './product-forms-page.component';

describe('ProductFormsPageComponent', () => {
  let component: ProductFormsPageComponent;
  let fixture: ComponentFixture<ProductFormsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
