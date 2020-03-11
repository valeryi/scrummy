import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SignInStatus {
  signIn: {
    success: boolean;
    message: string;
    token: string;
    errors: [string];
  };
}

export interface SignInInput {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignInMutation extends Mutation<SignInStatus> {
  document = gql`
		mutation signIn($email: String, $password: String) {
			signIn(email: $email, password: $password) {
        success
        message
        token
        errors
			}
		}
	`;
}
