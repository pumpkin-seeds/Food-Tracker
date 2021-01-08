import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFoodChipsComponent } from './common-food-chips.component';

describe('CommonFoodChipsComponent', () => {
  let component: CommonFoodChipsComponent;
  let fixture: ComponentFixture<CommonFoodChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFoodChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFoodChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
