import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PaiementComponent } from './paiement/paiement.component';

import { FormComponent } from './form/form.component';
import { EventComponent } from './event/event.component';
import { IntroductorySectionComponent } from './introductory-section/introductory-section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventlistsComponent } from './eventlists/eventlists.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { SearchResultComponent } from './search-result/search-result.component';


const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full' },
  { path: 'init', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'reserver',component:ReservationComponent},
  {path:'payer',component:PaiementComponent},
  { path: 'events', component: EventComponent },
{ path: 'form', component: FormComponent },
{ path: 'intro', component: IntroductorySectionComponent },
{ path: 'eventlist', component: EventlistsComponent },
{ path: 'eventdetails/:eventId', component: EventdetailComponent },
{ path: 'app-search-result',component: SearchResultComponent },

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
