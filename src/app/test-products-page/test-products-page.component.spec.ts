import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProductsPageComponent } from './test-products-page.component';

describe('TestProductsPageComponent', () => {
  let component: TestProductsPageComponent;
  let fixture: ComponentFixture<TestProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
