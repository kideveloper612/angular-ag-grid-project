import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import { RowData } from '../../core/models/row.model';

import { ImageComponent } from '../../shared/components/image/image.component';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {

  public columnDefs: Array<any>;
  public rowData: Array<RowData>;
  public enableSort: boolean = false;
  public enableFilter: boolean = false;
  public enablePagination: boolean = true;
  public paginationPageSize: number = 10;
  public context: any;
  public frameworkComponents: any;
  public getRowHeight: any;
  public _gridOptions: any;
  public _getMainMenuItems: any;
  public _postProcessPopup: any;
  public totalCount: any;
  public count: number = 0;
  gridColumnApi: any;
  modules = AllModules;

  constructor(private apiService: ApiService) {

    function RowClickEventHandler(event) {
      if (event.node.isSelected()) {
        event.node.setSelected(false, false);
      } else {
        event.node.setSelected(true);
      }
    }

    function VideoClickEventHandler(event: any){
      console.log("Test");
    }


    this.columnDefs = [
      {
        field: 'RowSelect',
        headerName: '',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        headerCellRenderer: selectAllRenderer,
        onRowClicked: RowClickEventHandler,
        width: 40
      },
      {
        headerName: '',
        field: 'thumbnails',
        cellRenderer: 'imageRenderer',
        width: 150,
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        width: 300,
      },
      {
        headerName: 'Video Title',
        field: 'title',
        width: 300,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 300,
      }
    ];

    this.context = { componentParent: this };
    this.frameworkComponents = {
      imageRenderer: ImageComponent,
    };

    this.getRowHeight = function (params: any) {
      return params.data.rowHeight;
    }

    function selectAllRenderer(params) {
      var cb = document.createElement('input');
      cb.setAttribute('type', 'checkbox');

      var eHeader = document.createElement('label');
      var eTitle = document.createTextNode(params.colDef.headerName);
      eHeader.appendChild(cb);
      eHeader.appendChild(eTitle);

      cb.addEventListener('change', function (e) {
        if ((this)[0].checked) {
          params.api.selectAll();
          console.log('param api: ', params.api);
        } else {
          params.api.deselectAll();
          console.log('param api: ', params.api);
        }
      });
      return eHeader;
    }

    this._postProcessPopup = function (params) {
      if (params.type !== "columnMenu") {
        return;
      }
      var columnId = params.column.getId();
      if (columnId === "gold") {
        var ePopup = params.ePopup;
        var oldTopStr = ePopup.style.top;
        oldTopStr = oldTopStr.substring(0, oldTopStr.indexOf("px"));
        var oldTop = parseInt(oldTopStr);
        var newTop = oldTop + 25;
        ePopup.style.top = newTop + "px";
      }
    };

  }

  onGridReady(params: any) {
    console.log('grid ready: ', params);
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(event: any) {
  }

  onRowSelected(event: any) {
    console.log(event.node.selected);
    if (event.node.selected) this.count += 1;
    else this.count -= 1;
  }

  ngOnInit() {
    this.apiService.get().subscribe((res) => {
      this.totalCount = res.items.length;
      this.rowData = res.items.map((item, index) => {
        return {
          thumbnails: item.snippet.thumbnails.default.url + ',' + 'https://www.youtube.com/watch?v=' + item.id.videoId,
          publishedAt: item.snippet.publishedAt,
          title: 'https://www.youtube.com/watch?v=' + item.id.videoId,
          description: item.snippet.description,
          rowHeight: 100
        }
      });
    });
  }

  hideColumn() {
    console.log(this.gridColumnApi);
    this.gridColumnApi.setColumnsVisible(['RowSelect'], false);
  }

  showColumn() {
    this.gridColumnApi.setColumnsVisible(['RowSelect'], true);
  }

  getContextMenuItems(params) {
    var result = [
      {
        name: "Copy",
        shortcut: "Ctrl + C",
        action: function () {
          var copyText = document.getElementById("contextCopyId") as HTMLInputElement;
          copyText.value = params.value;
          copyText.select();
          document.execCommand("copy");
        },
      },
      {
        name: "Display youtube",
        shortcut: "Ctrl + T",
        action: function () {
          var youtube = document.getElementById("youtubeLink");
          youtube.setAttribute("href", params.value);
          youtube.setAttribute("target", "_blank");
          document.getElementById("youtubeLink").click();
        },
      },
    ];
    return result;
  }
}
