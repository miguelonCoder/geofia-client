import { magenta } from './../../../../node_modules/@colors/colors/index.d';
import { Component, inject } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';
import { appStore } from '../../state/app-store';

export type MessageType = {
  id: string,
  type: 'user' | 'system',
  message: string
}

@Component({
  selector: 'app-chat',
  imports: [MessagesComponent, ChatInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
 store = inject(appStore)

 onQuery(message: MessageType){
  this.store.addUserMessage(message)
 }
}
