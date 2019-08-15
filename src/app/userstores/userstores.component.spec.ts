import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoresComponent } from './userstores.component';

describe('UserstoresComponent', () => {
  let component: UserstoresComponent;
  let fixture: ComponentFixture<UserstoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
