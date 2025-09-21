import { Component, inject } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { MessageType } from '../chat.component';
import { appStore, StatusResponse } from '../../../state/app-store';
import { Spinner } from '../../spinner/spinner';

@Component({
  selector: 'app-messages',
  imports: [MessageComponent, Spinner],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  statusOptions = StatusResponse
  store = inject(appStore)
}
