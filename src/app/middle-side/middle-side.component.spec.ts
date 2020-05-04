import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSideComponent } from './middle-side.component';

describe('MiddleSideComponent', () => {
  let component: MiddleSideComponent;
  let fixture: ComponentFixture<MiddleSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
