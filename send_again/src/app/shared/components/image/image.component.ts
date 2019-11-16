import { Component, OnInit } from '@angular/core';
import { ICellRenderer } from 'ag-grid-community';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements ICellRenderer {

  constructor() { }

  public params: any;
  public imgSrc: string;
  public videoSrc: string;

  agInit(params: any): void {
    this.params = params;
    this.imgSrc = params.value.split(',')[0];
    this.videoSrc = params.value.split(',')[1];
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);
  }

  refresh(): boolean {
    return false;
  }

}
