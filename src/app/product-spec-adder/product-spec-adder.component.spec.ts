import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecAdderComponent } from './product-spec-adder.component';

describe('ProductSpecAdderComponent', () => {
  let component: ProductSpecAdderComponent;
  let fixture: ComponentFixture<ProductSpecAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSpecAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
