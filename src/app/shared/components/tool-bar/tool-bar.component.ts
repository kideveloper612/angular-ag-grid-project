import { Component, OnInit } from '@angular/core';
import { ICellRenderer } from 'ag-grid-community';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements ICellRenderer {

  constructor() { }

  public totalcount: number;
  public count: number;

  agInit(totalcount: number, count: number): void {
    this.totalcount = totalcount;
    this.count = count;
  }

  refresh(): boolean {
    return false;
}

}
