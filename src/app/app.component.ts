import { Component } from '@angular/core';
import { LoadingIndicatorService } from './_helpers/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flashcarder';

  constructor(private loading: LoadingIndicatorService) {

  }
}
