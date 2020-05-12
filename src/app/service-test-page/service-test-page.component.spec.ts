import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTestPageComponent } from './service-test-page.component';

describe('ServiceTestPageComponent', () => {
  let component: ServiceTestPageComponent;
  let fixture: ComponentFixture<ServiceTestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
