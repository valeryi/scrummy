import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpInput {
  email: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface SignUpStatus {
  success: boolean;
  message: string;
  created: User;
}

@Injectable({
  providedIn: 'root'
})
export class SignUpMutation extends Mutation<SignUpStatus> {
  document = gql`
		mutation signUp($SignUpInput: SignUpInput!) {
			signUp(SignUpInput: $SignUpInput) {
        success
        message
        created {
          id
          email
          firstName
          lastName
          role
          confirmed
        }
			}
		}
	`;
}
