import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material';
import { CustomNavbarComponent } from './Components/custom-navbar/custom-navbar.component';
import { CustomNavButtonComponent } from './Components/Buttons/custom-nav-button/custom-nav-button.component';
import { QueryFormComponent } from './Components/query-form/query-form.component';
import { HomeComponent } from './home/home.component';
import { ViewUpdateComponent } from './view-update/view-update.component';
import { UploadComponent } from './upload/upload.component';
import { ObjectionsComponent } from './objections/objections.component';
import { CustomSubmitButtonComponent } from './Components/Buttons/custom-submit-button/custom-submit-button.component';
import { ResultsComponent } from './results/results.component';
import { PageTransitButtonComponent } from './Components/Buttons/page-transit-button/page-transit-button.component';
import { TableComponent } from './Components/Table/custom-table/table.component';
import { RowComponent } from './Components/Table/custom-row/row.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomNavbarComponent,
    CustomNavButtonComponent,
    QueryFormComponent,
    HomeComponent,
    ViewUpdateComponent,
    UploadComponent,
    ObjectionsComponent,
    CustomSubmitButtonComponent,
    ResultsComponent,
    PageTransitButtonComponent,
    TableComponent,
    RowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
