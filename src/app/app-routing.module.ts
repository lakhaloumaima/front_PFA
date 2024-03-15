import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';
import { SubdomainResolverService } from './services/subdomain-resolver.service';

const routes: Routes = [
  { path: "home", component: HomeComponent //, canActivate: [RouteGuardService]*
} ,
  { path: 'meetings', component: MeetingComponent //, canActivate: [RouteGuardService] 
},
  { path: 'chat', component: ChatComponent //, canActivate: [RouteGuardService],
                  // resolve: {
                  //   subdomain: SubdomainResolverService // Resolve the subdomain before activating the route
                  // }
                },
  { path: '', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
