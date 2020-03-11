import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {

      switch (true) {
        case event instanceof NavigationStart: {
          this.show();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {

          this.hide();
          break;
        }


        default:
          break;
      }

    });
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
