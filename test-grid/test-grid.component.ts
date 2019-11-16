import { Component, OnInit } from '@angular/core';

import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-grid',
  templateUrl: './test-grid.component.html',
  styleUrls: ['./test-grid.component.scss']
})

export class TestGridComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = AllModules;

  public columnDefs;
  public rowData;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150
      },
      {
        headerName: "Age",
        field: "age",
        width: 90
      },
      {
        headerName: "Country",
        field: "country",
        width: 120
      },
      {
        headerName: "Year",
        field: "year",
        width: 90
      },
      {
        headerName: "Date",
        field: "date",
        width: 110
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100
      },
      {
        headerName: "Total",
        field: "total",
        width: 100
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }
  ngOnInit() {

  }

  getContextMenuItems(params) {
    var result = [
      {
        name: "Alert " + params.value,
        action: function () {
          window.alert("Alerting about " + params.value);
        },
        cssClasses: ["redFont", "bold"]
      },
      {
        name: "Always Disabled",
        disabled: true,
        tooltip: "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!"
      },
      {
        name: "Country",
        subMenu: [
          {
            name: "Ireland",
            action: function () {
              console.log("Ireland was pressed");
            },
          },
          {
            name: "UK",
            action: function () {
              console.log("UK was pressed");
            },
          },
          {
            name: "France",
            action: function () {
              console.log("France was pressed");
            },
          }
        ]
      },
      {
        name: "Person",
        subMenu: [
          {
            name: "Niall",
            action: function () {
              console.log("Niall was pressed");
            }
          },
          {
            name: "Sean",
            action: function () {
              console.log("Sean was pressed");
            }
          },
          {
            name: "John",
            action: function () {
              console.log("John was pressed");
            }
          },
          {
            name: "Alberto",
            action: function () {
              console.log("Alberto was pressed");
            }
          },
          {
            name: "Tony",
            action: function () {
              console.log("Tony was pressed");
            }
          },
          {
            name: "Andrew",
            action: function () {
              console.log("Andrew was pressed");
            }
          },
          {
            name: "Kev",
            action: function () {
              console.log("Kev was pressed");
            }
          },
          {
            name: "Will",
            action: function () {
              console.log("Will was pressed");
            }
          },
          {
            name: "Armaan",
            action: function () {
              console.log("Armaan was pressed");
            }
          }
        ]
      },
      "separator",
      {
        name: "Windows",
        shortcut: "Alt + W",
        action: function () {
          console.log("Windows Item Selected");
        },
        icon: '<img src="../images/skills/windows.png"/>'
      },
      {
        name: "Mac",
        shortcut: "Alt + M",
        action: function () {
          console.log("Mac Item Selected");
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "separator",
      {
        name: "Checked",
        checked: true,
        action: function () {
          console.log("Checked Selected");
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "copy",
      "separator",
      "chartRange"
    ];
    return result;
  }

}
