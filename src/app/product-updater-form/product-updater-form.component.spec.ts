import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdaterFormComponent } from './product-updater-form.component';

describe('ProductUpdaterFormComponent', () => {
  let component: ProductUpdaterFormComponent;
  let fixture: ComponentFixture<ProductUpdaterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUpdaterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
