import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscategoriesComponent} from './categories/categories.component';

describe('CategoriesComponent', () => {
  let component: UserscategoriesComponent;
  let fixture: ComponentFixture<UserscategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      UserscategoriesComponent    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscategoriesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
