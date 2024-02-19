import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MeetingComponent } from './meeting/meeting.component';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from './services/meetings.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component'; // Assuming environment.ts is available
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeetingComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),

  ],
  providers: [ MeetingsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
