import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate, OnDestroy {

  signedIn: boolean;
  subscription$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.subscription$ = this.authService.isSignedIn.subscribe(state => this.signedIn = state);

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    if (this.signedIn) {
      return true;
    }

    this.router.navigate(['/signIn']);
    return false;


  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
