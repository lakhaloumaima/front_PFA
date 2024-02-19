import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { createConsumer } from '@rails/actioncable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private cable: any;

  constructor(private socket: Socket, private http: HttpClient  ) {}

  createMessage(message: { message: string }) {
    // debugger
    return this.http.post<any>('http://localhost:3000/messages', message );
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessage() {
    return this.socket.fromEvent('message');
  }

  connectToActionCable() {
    this.cable = createConsumer('ws://localhost:3000/cable');
    const subscription = this.cable.subscriptions.create('chats_Channel', {
      received(data: any) {
        console.log('Message received from server:', data.content);
        // You can emit the received message to the socket for the components to listen to
        // this.socket.emit('message', data.content);
      }
    });
  }

  getMessages() {
    return this.http.get<any[]>('http://localhost:3000/messages');
  }
}
