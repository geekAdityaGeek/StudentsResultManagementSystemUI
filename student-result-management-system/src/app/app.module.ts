import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatMenuModule } from '@angular/material';
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
import { RegisterformComponent } from './Components/registerform/registerform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpCalIInterceptor } from './httpinterceptor/http.interceptor';




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
    RegisterformComponent,
    ConfirmationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      maxOpened: 3,
      autoDismiss: true,
      newestOnTop: true,
    }), // ToastrModule added
    HttpClientModule,
    FormsModule
  ],
  providers: [    
    CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCalIInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
