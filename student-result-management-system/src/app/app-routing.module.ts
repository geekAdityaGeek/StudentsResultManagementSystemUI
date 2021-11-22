import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterformComponent } from './Components/registerform/registerform.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ObjectionsComponent } from './objections/objections.component';
import { ResultsComponent } from './results/results.component';
import { UploadComponent } from './upload/upload.component';
import { ViewUpdateComponent } from './view-update/view-update.component';


const routes: Routes = [
  {path: '',   redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'view-update', component: ViewUpdateComponent},
  {path: 'objections', component: ObjectionsComponent},
  {path: 'results', component:ResultsComponent},
  {path: 'register', component:RegisterformComponent},
  {path: 'user-conf', component: ConfirmationComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
