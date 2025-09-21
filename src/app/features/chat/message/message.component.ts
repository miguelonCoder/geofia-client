import { Component, input } from '@angular/core';
import { MessageType } from '../chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message = input.required<MessageType>()
}
