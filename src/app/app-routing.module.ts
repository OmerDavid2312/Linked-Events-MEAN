import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Auth
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
//Events
import { EventsComponent } from './components/events/events/events.component';
import { JoinedEventsComponent } from './components/events/joined-events/joined-events.component';
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';
//Users Events
import { CreatedEventsComponent } from './components/users-events/created-events/created-events.component';
import { ManageEventComponent } from './components/users-events/manage-event/manage-event.component';
import { EditEventComponent } from './components/users-events/edit-event/edit-event.component';
import { PostEventComponent } from './components/users-events/post-event/post-event.component';
//404
import { NotFoundComponent } from './components/not-found/not-found.component';







const routes: Routes = [
  { path: '', component: EventsComponent, canActivate:[AuthGuard]}, 
  { path: 'login', component: LoginComponent  }, 
  { path: 'register', component: RegisterComponent  }, 
  //events
  { path: 'events/joined', component: JoinedEventsComponent , canActivate:[AuthGuard]  }, 
  { path: 'events/:id', component: EventDetailComponent , canActivate:[AuthGuard] }, 
  //Users Events
  { path: 'myevents', component: CreatedEventsComponent , canActivate:[AuthGuard] }, 
  { path: 'myevents/add', component: PostEventComponent , canActivate:[AuthGuard] },
  { path: 'myevents/:id', component: ManageEventComponent , canActivate:[AuthGuard] }, 
  { path: 'myevents/edit/:id', component: EditEventComponent , canActivate:[AuthGuard] }, 
  //404 
  { path: '**', component: NotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
