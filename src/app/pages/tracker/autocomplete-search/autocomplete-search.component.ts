import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FoodItem } from '../../../common/constants';


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.css']
})

export class AutocompleteSearchComponent implements OnInit {

  searchFormControl = new FormControl();

  @Input() foodList: FoodItem[];
  // child component going to emit food selected to parent component tracker-home
  @Output() onFoodPicked = new EventEmitter<string>();

  filteredOptions: Observable<FoodItem[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // TODO(minalong): as user types, send input to BE endpoint to dynamically 
  // send back a list of FoodItems for FE filtering. To refactor the filter function.
  // do not have frontend handle the entire foodItem list.
  private _filter(name: string): FoodItem[] {
    const filterValue = name.toLowerCase();
    return this.foodList.filter(option => option.foodName.toLowerCase().indexOf(filterValue) === 0);
  }

  // Once user selects a food, reset the value to ''
  // emits an event to parent component tracker-home to pass the selected food name
  // TODO(minalong): note that the food name here is foodname + sizePerServing, might need to refactor
  selectFood(event: MatAutocompleteSelectedEvent) {
    this.searchFormControl.setValue('');
    // console.log("yes:" + event.option.value);
    this.onFoodPicked.emit(event.option.value);
  }

}
