import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageType } from '../chat.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
   chatInput: string | undefined

   sendQuery = output<MessageType>()

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // reset
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  click(){
    this.chatInput && this.sendQuery.emit({
      id: uuidv4(),
      message: this.chatInput,
      type: 'user'
    })
    this.chatInput = undefined
  }
}
