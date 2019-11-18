import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {LicenseManager} from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("Evaluation_License_Not_For_Production_18_January_2020__MTU3OTMwNTYwMDAwMA==96c8f636a979d5c2b9d7519ce9b974ff");
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
