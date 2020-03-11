import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isSignedIn: boolean;
  subscriptions$: [Subscription] = [new Subscription];

  constructor(
    private authService: AuthService
  ) {
    const isSignedIn = this.authService.isSignedIn.subscribe(state => this.isSignedIn = state);

    this.subscriptions$.push(isSignedIn);
  }

  ngOnInit(): void {
  }

  signOut() {

    this.authService.signOut();
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

}
