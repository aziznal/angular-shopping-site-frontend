import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRemoverFormComponent } from './product-remover-form.component';

describe('ProductRemoverFormComponent', () => {
  let component: ProductRemoverFormComponent;
  let fixture: ComponentFixture<ProductRemoverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRemoverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRemoverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
