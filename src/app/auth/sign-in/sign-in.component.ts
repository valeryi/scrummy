import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [''],
      pwd: [''],
    });

    this.reset();
  }

  onSubmit(e) {
    e.preventDefault();

    const params = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.pwd
    };

    this.authService.signIn(params);
    this.reset();
  }

  private reset() {
    this.signInForm.reset();
  }

}
