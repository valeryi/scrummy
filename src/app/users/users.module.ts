import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../_helpers/material/material.module';
import { FlexibleTableComponent } from '../_helpers/flexible-table/flexible-table.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    FlexibleTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule
  ]
})
export class UsersModule { }
