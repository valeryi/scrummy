import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const modules = [
  CommonModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
