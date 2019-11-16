import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './pages/grid/grid.component';

import { ApiService } from './core/services/api.service';
import { ImageComponent } from './shared/components/image/image.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ImageComponent,
    ToolBarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([ImageComponent]),
    AppRoutingModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
