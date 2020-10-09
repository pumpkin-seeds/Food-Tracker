import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

import { TrackerRoutingModule } from './tracker-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    MatInputModule,
  ]
})
export class TrackerModule { }
