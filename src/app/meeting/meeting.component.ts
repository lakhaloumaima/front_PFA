import { Component, OnInit } from '@angular/core';
import { createConsumer } from '@rails/actioncable';
import { Socket } from 'ngx-socket-io';
import { MeetingsService } from '../services/meetings.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
  message: string = '';
  meetings: any[] = [];
  newMeetingName: string = "";
  date = new Date();

  private cable: any;

  constructor(private meetingService: MeetingsService, private socket: Socket) { }

  ngOnInit(): void {

    this.meetingService.getMeetings().subscribe(
      (meetings: any[]) => {
        this.meetings = meetings;
        console.log( this.meetings )
        // debugger
      },
      (error) => {
        console.error('Error fetching meetings:', error);
      }
    );

    // Subscribe to incoming meetings from the WebSocket server
    this.socket.fromEvent('message').subscribe((message: any) => {
      this.meetings.push(message);
    });

    // Connect to Action Cable when the component initializes
    this.cable = createConsumer('ws://localhost:3000/cable');
    this.cable.subscriptions.create('MeetingsChannel', {
      received: (data: any) => {
        console.log('Message received from server:', data);
        // Add the new message to the meetings array
        debugger
        this.meetings.push(data.meeting);
      }
    });
  }

  createMeeting(): void {
    if (this.newMeetingName.trim() !== '') {
      this.meetingService.createMeeting({ title: this.newMeetingName , date: this.date }).subscribe(
        (response) => {
          // Emit the message to the WebSocket server
          // this.socket.emit('message', this.newMeetingName);
          console.log('Message created successfully:', response);
          // this.meetings.push({ message: response.message });

          this.newMeetingName = ''; // Clear the input field after creating the message
        },
        (error) => {
          console.error('Error creating message:', error);
        }
      );
    }
  }
}
