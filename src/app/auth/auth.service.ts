import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInMutation } from './sign-in.graphql';
import { SignUpMutation } from './sign-up.graphql';
import { BehaviorSubject } from 'rxjs';

// TODO: To learn is observable is unsubscribed in services automatically. In Classes there is an Inteface OnDestroy for that

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private signInMutation: SignInMutation,
    private signUpMutation: SignUpMutation
  ) { }

  signIn(params) {

    this.signInMutation.mutate(params)
      .subscribe({

        next: ({ data }) => {


          const signIn = data.signIn;

          localStorage.setItem('token', signIn.token);
          this.router.navigate(['/dashboard']);
          this.isSignedIn.next(true);

        },

        error: console.log
      });

  }

  signUp(SignUpInput) {

    this.signUpMutation.mutate({ SignUpInput })
      .subscribe({
        next: console.log,
        error: console.log,
      });

  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.isSignedIn.next(false);
  }

  // isSignedIn(): boolean {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     return true;
  //   }
  // }
}
