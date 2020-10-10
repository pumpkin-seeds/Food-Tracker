import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FoodItem, foodList } from '../../../common/constants';


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.css']
})

export class AutocompleteSearchComponent implements OnInit {

  searchFormControl = new FormControl();

  foodList: FoodItem[] = foodList; // constants

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
}
