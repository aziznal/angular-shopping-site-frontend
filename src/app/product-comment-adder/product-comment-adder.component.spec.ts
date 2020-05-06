import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommentAdderComponent } from './product-comment-adder.component';

describe('ProductCommentAdderComponent', () => {
  let component: ProductCommentAdderComponent;
  let fixture: ComponentFixture<ProductCommentAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCommentAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCommentAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
