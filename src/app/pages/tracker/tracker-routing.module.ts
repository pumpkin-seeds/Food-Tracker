import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
