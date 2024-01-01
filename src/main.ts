import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// To "bootstrap" an application typically means to set up the initial configuration and dependencies
// required for the application to run
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
