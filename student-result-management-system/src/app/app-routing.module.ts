import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObjectionsComponent } from './objections/objections.component';
import { ResultsComponent } from './results/results.component';
import { UploadComponent } from './upload/upload.component';
import { ViewUpdateComponent } from './view-update/view-update.component';


const routes: Routes = [
  {path: '',   redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'view-update', component: ViewUpdateComponent},
  {path: 'objections', component: ObjectionsComponent},
  {path: 'results', component:ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
