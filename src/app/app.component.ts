import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map } from './features/map/map.component';
import { ChatComponent } from './features/chat/chat.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [Map, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'geofia';
}
