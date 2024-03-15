import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { createConsumer } from '@rails/actioncable';


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  // constructor( ) {}

  constructor(private socket: Socket, private http: HttpClient ) {}

  // sendMessage(message: string) {
  //   this.socket.emit('message', message);
  // }

  // receiveMessage() {
  //   return this.socket.fromEvent('message');
  // }

  getMeetings() {
    return this.http.get<any[]>('http://localhost:3000/meetings');
  }

  createMeeting(meeting: { title: string, date: Date }) {
    return this.http.post<any>('http://localhost:3000/meetings', meeting);
  }

  private cable: any; // Type 'any' is used for simplicity, you can define a specific type if needed

  connectToActionCable() {
    this.cable = createConsumer('ws://localhost:3000/cable');
    // Créer un abonnement au canal MeetingsChannel
    const subscription = this.cable.subscriptions.create('MeetingsChannel', {
      received(data: any) {
        // Logique de traitement pour les messages reçus du serveur
        console.log('Message received from server service :', data.meeting );
      }
    });

    // Envoyer un message au serveur via Action Cable
    subscription.perform('receive', { someData: 'Hello from client!' });

  }

  // getCable() {
  //   return this.cable;
  // }






































  

}
