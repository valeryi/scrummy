import { Component, OnInit, OnDestroy } from '@angular/core';
import { AllUsers } from './allUsers.graphql';
import { pluck, map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { DeleteUserMutation } from './deleteUser.graphql';
import { User } from '../auth/sign-up.graphql';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { WebSocketService } from '../_helpers/web-socket.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  originUsers: Array<User>;
  filteredUsers: Array<User>;
  subscription$: [Subscription] = [new Subscription()];
  tableSearch: FormControl = new FormControl('');

  constructor(
    private allUsers: AllUsers,
    private deleteUser: DeleteUserMutation,
    private webSocketService: WebSocketService
  ) {

    const allUsers$ = this.allUsers.watch()
      .valueChanges
      .pipe(
        pluck('data', 'allUsers'),
      )
      .subscribe(res => {
        this.originUsers = res;
        this.filteredUsers = res;
      });

    this.subscription$.push(allUsers$);

  }

  ngOnInit(): void {

    // Emitting WebSocket message
    this.webSocketService.emit('user event', 'Hello from a user');

    const tableSearch$ = this.tableSearch.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        this.tSearch()
      )
      .subscribe((result) => {
        this.filteredUsers = result;
        console.log((result));
      });

    this.subscription$.push(tableSearch$);
  }

  // RxJS Custom operator = searching through the table
  private tSearch = () => map((request: string) => {
    request = request.trim();

    const f = this.originUsers.filter(item => {

      if (request.length > 0) {

        return findMatch(item, request);

        function findMatch(el: object | string, find: string): object {

          if (typeof el === 'object') {

            for (const key in el) {

              if (el.hasOwnProperty(key)) {
                const value = el[key];


                if (typeof value === 'object') {
                  findMatch(value, find);
                } else {
                  const exp = new RegExp(find, 'i');

                  const r = exp.test(value);

                  if (r) {
                    return value;
                  }

                }
              }
            }
          }
        }

      } else {
        return item;
      }

    });

    return f;
  })

  onEdit() {
    console.log('edit');
  }

  onDelete(user) {

    const deleteUser$ = this.deleteUser.mutate({ id: user._id })
      .subscribe((res: any) => {
        this.filteredUsers = this.originUsers.filter((u) => u._id !== res.data.deleteUser._id);
      });

    this.subscription$.push(deleteUser$);

  }

  ngOnDestroy() {
    this.subscription$.forEach($ => $.unsubscribe());
  }
}
