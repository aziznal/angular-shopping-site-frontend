import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSideComponent } from './top-side.component';

describe('TopSideComponent', () => {
  let component: TopSideComponent;
  let fixture: ComponentFixture<TopSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
