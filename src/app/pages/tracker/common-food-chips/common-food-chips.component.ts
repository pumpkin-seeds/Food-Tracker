import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { FoodInfoBE } from 'src/app/common/constants';

@Component({
  selector: 'app-common-food-chips',
  templateUrl: './common-food-chips.component.html',
  styleUrls: ['./common-food-chips.component.css']
})
export class CommonFoodChipsComponent implements OnInit {

  @Input() preferredFood: FoodInfoBE[];
  @Output() onPreferredFoodPicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // user selects a food from chiplist
  foodSelected(event: MatChipSelectionChange, foodId: string): void {
    console.log(foodId);
    this.onPreferredFoodPicked.emit(foodId);
  }

}
