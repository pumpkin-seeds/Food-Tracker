import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nutrition-panel',
  templateUrl: './nutrition-panel.component.html',
  styleUrls: ['./nutrition-panel.component.css']
})
export class NutritionPanelComponent implements OnInit {

  panelOpenState = open;
  @Input() summary: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
