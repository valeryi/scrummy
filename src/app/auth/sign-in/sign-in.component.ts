import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { emailFormat } from '../../_helpers/custom-validation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  submitted: boolean;
  subscription$: [Subscription] = [new Subscription()];
  errors = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [emailFormat]],
      pwd: [''],
    });
  }

  onSubmit(e) {

    this.submitted = true;

    if (this.signInForm.valid) {
      const params = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.pwd
      };

      const signIn$ = this.authService.signIn(params)
        .subscribe({
          next: console.log,
          error: (err) => {
            this.errors = [];
            this.errors.push(`User doesn't exist`);
          }
        });

      this.subscription$.push(signIn$);

      this.reset();
    }


  }

  private reset() {
    this.signInForm.reset();
    this.submitted = false;
  }

  ngOnDestroy() {
    this.subscription$.forEach($ => $.unsubscribe());
  }

}
