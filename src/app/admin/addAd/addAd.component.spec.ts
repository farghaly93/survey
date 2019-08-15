import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {addAdComponent} from './addAd.component';

describe('addAdComponent', () => {
  let component: addAdComponent;
  let fixture: ComponentFixture<addAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
