import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
import { AutocompleteSearchComponent } from './autocomplete-search/autocomplete-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NutritionPanelComponent } from './nutrition-panel/nutrition-panel.component';

@NgModule({
  declarations: [
    TrackerHomeComponent,
    AutocompleteSearchComponent,
    DatePickerComponent,
    NutritionPanelComponent,
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    // Angular Material Imports to use those modules
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ]
})
export class TrackerModule { }
