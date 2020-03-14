import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from './_helpers/loading-indicator/loading-indicator.service';
import { WebSocketService } from './_helpers/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flashcarder';

  constructor(
    private webSocketService: WebSocketService
  ) {

  }
  ngOnInit(): void {
    this.webSocketService.emit('active user', 'User');
  }


}
