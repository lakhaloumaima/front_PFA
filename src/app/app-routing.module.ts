import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: "", component: HomeComponent } ,
  { path: "home", component: HomeComponent } ,
  { path: 'meetings', component: MeetingComponent },
  { path: 'chat', component: ChatComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
