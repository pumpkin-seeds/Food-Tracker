import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FoodService } from 'src/app/services/food.service';
import { FoodItem } from '../../../common/constants';


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.css']
})

export class AutocompleteSearchComponent implements OnInit {

  searchFormControl = new FormControl();

  foodList: FoodItem[] = [];
  // child component going to emit food selected to parent component tracker-home
  @Output() onFoodPicked = new EventEmitter<string>();

  filteredOptions: Observable<FoodItem[]>;

  constructor(private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.searchFormControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(value => this._filter(value)) // switchMap since we have inner observable
      );
  }

  // Send search term to BE and return a list of FoodItems
  // without nutrition details.
  private _filter(name: string): Observable<FoodItem[]> {
    if (name.length === 0) {
      return of([]);
    } 
    const filterValue = name.toLowerCase();
    return this.foodService.searchFoodListByName(name);
  }

  // Once user selects a food, reset the value to ''
  // emits an event to parent component tracker-home to pass the selected food id
  selectFood(event: MatAutocompleteSelectedEvent) {
    this.searchFormControl.setValue('');
    // console.log("yes:" + event.option.value);
    this.onFoodPicked.emit(event.option.value);
  }

}
