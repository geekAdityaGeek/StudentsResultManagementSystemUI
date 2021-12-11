import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterformComponent } from './Components/registerform/registerform.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ObjectionsComponent } from './objections/objections.component';
import { ResultsComponent } from './results/results.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { UploadComponent } from './upload/upload.component';
import { ViewUpdateComponent } from './view-update/view-update.component';


const routes: Routes = [
  {path: '',   redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGaurdService]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGaurdService]},
  {path: 'view-update', component: ViewUpdateComponent, canActivate: [AuthGaurdService]},
  {path: 'objections', component: ObjectionsComponent, canActivate: [AuthGaurdService]},
  {path: 'results', component:ResultsComponent, canActivate: [AuthGaurdService]},
  {path: 'register', component:RegisterformComponent},
  {path: 'user-conf', component: ConfirmationComponent, canActivate: [AuthGaurdService]},
  {path: 'login', component: LoginComponent},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
