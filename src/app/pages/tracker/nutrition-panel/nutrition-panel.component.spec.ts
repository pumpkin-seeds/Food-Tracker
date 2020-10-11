import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionPanelComponent } from './nutrition-panel.component';

describe('NutritionPanelComponent', () => {
  let component: NutritionPanelComponent;
  let fixture: ComponentFixture<NutritionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
