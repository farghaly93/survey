import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresMainComponent } from './stores-main.component';

describe('StoresMainComponent', () => {
  let component: StoresMainComponent;
  let fixture: ComponentFixture<StoresMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
