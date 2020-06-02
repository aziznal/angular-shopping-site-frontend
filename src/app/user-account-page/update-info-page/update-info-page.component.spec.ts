import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoPageComponent } from './update-info-page.component';

describe('UpdateInfoPageComponent', () => {
  let component: UpdateInfoPageComponent;
  let fixture: ComponentFixture<UpdateInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
