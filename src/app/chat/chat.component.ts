import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { createConsumer } from '@rails/actioncable';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: any[] = [];
  newmessage: string = "";
  private cable: any;

  constructor(private chatService: ChatService, private socket: Socket) { }

  ngOnInit(): void {

    this.chatService.getMessages().subscribe(
      (messages: any[]) => {
        this.messages = messages;
        console.log( this.messages )
        // debugger
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    // Subscribe to incoming messages from the WebSocket server
    this.socket.fromEvent('message').subscribe((message: any) => {
      this.messages.push(message);
    });

    // Connect to Action Cable when the component initializes
    this.cable = createConsumer('ws://localhost:3000/cable');
    this.cable.subscriptions.create('ChatsChannel', {
      received: (data: any) => {
        console.log('Message received from server:', data);
        // Add the new message to the messages array
        debugger
        this.messages.push(data.message);
      }
    });
  }

  createMessage(): void {
    if (this.newmessage.trim() !== '') {
      this.chatService.createMessage({ message: this.newmessage }).subscribe(
        (response) => {
          // Emit the message to the WebSocket server
          // this.socket.emit('message', this.newmessage);
          console.log('Message created successfully:', response);
          // this.messages.push({ message: response.message });

          this.newmessage = ''; // Clear the input field after creating the message
        },
        (error) => {
          console.error('Error creating message:', error);
        }
      );
    }
  }
}
