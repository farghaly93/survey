import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthmodalComponent } from './authmodal.component';

describe('AuthmodalComponent', () => {
  let component: AuthmodalComponent;
  let fixture: ComponentFixture<AuthmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
