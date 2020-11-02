import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  // default date to today's date
  formControlDate = new FormControl(new Date());
  @Output() datePicked = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
    // emit default date to tracker-home
    this.datePicked.emit(this.formControlDate.value);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.datePicked.emit(event.value);
  }

}
