import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.css']
})
export class SubmitDialogComponent implements OnInit {

  title: string;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit(): void {
  }
}
