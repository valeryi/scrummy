import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../auth/sign-up.graphql';

export interface AllUsersResponse {
  allUsers: [User];
  loading: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class AllUsers extends Query<AllUsersResponse> {
  document = gql`
    query {
      allUsers {
        _id
        firstName
        lastName
        email
        confirmed
        role
        createdAt
        updatedAt
      }
    }
  `;
}
