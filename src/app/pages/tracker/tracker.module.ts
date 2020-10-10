import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
import { AutocompleteSearchComponent } from './autocomplete-search/autocomplete-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrackerHomeComponent,
    AutocompleteSearchComponent,
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
  ]
})
export class TrackerModule { }
