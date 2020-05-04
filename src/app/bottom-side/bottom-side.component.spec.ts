import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSideComponent } from './bottom-side.component';

describe('BottomSideComponent', () => {
  let component: BottomSideComponent;
  let fixture: ComponentFixture<BottomSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
