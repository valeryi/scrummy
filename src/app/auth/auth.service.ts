import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInMutation, SignInInput } from './sign-in.graphql';
import { SignUpMutation, SignUpInput } from './sign-up.graphql';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// TODO: To learn if observable is unsubscribed in services automatically. In Classes there is an Inteface OnDestroy for that

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private signInMutation: SignInMutation,
    private signUpMutation: SignUpMutation
  ) {
    this.isSignedIn();
  }

  signIn(params: SignInInput) {

    return this.signInMutation.mutate(params).pipe(

      tap(({ data }) => {

        const signIn = data.signIn;
        const token = signIn.token;

        const { payload } = JSON.parse(atob(token.split('.')[1]));
        const currentUser = payload.userData;

        const localData = {
          currentUser,
          token
        };

        this.setLocalData(localData);

        this.router.navigate(['/dashboard']);
        this.auth.next(true);


      })
    );

  }

  signUp(SignUpInput: SignUpInput) {

    this.signUpMutation.mutate({ SignUpInput })
      .subscribe({
        next: console.log,
        error: console.log,
      });

  }

  private getLocalData(name: string): null | object | string {
    const data = localStorage.getItem(name);
    if (!data) { return null; }

    if (/^(\{).*(\})$/i.test(data)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  private setLocalData(data: object) {

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];

        if (typeof value === 'object') {
          localStorage.setItem(key, JSON.stringify(data[key]));
        } else {
          localStorage.setItem(key, data[key]);
        }

      }
    }

  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    this.auth.next(false);
  }

  private isSignedIn() {
    const token = this.getLocalData('token') as string;
    const checkFormat = (token && token.split('.').length === 3) ? true : null;

    if (token && checkFormat) {
      this.auth.next(true);
    }

  }

}
