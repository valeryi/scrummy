import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { emailMatch, passwordFormat, passwordsMatch } from '../../_helpers/custom-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;

  // TODO: Solve the problem with type definition declaring a property
  subscriptions$: any = [];
  submitted = false;

  name = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  email = ['', [Validators.required, emailMatch]];

  password = this.fb.group({
    pwd: ['', [Validators.required, Validators.minLength(7), passwordFormat]],
    confirm: ['', Validators.required]
  }, { validator: passwordsMatch });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  get f() { return this.signUpForm.controls; }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
    });

  }

  onSubmit(e) {
    e.preventDefault();

    this.submitted = true;

    if (this.signUpForm.valid) {

      const SignUpInput = {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password.pwd,
        confirm: this.signUpForm.value.password.confirm,
        firstName: this.signUpForm.value.name.firstname,
        lastName: this.signUpForm.value.name.lastname
      };

      this.authService.signUp(SignUpInput);

      this.onReset();
    }
  }

  onReset() {
    this.signUpForm.reset();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    if (this.subscriptions$.length > 0) {

      this.subscriptions$.forEach(sub => sub.unsubscribe());
    }
  }
}
