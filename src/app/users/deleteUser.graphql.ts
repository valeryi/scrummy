import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../auth/sign-up.graphql';

export interface DeleteUserResponse {
  data: {
    deleteUser: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserMutation extends Mutation<DeleteUserResponse> {
  document = gql`
		mutation deleteUser($id: String) {
			deleteUser(id: $id) {
        _id
        firstName
        lastName
        email
        confirmed
        role
			}
		}
	`;
}
