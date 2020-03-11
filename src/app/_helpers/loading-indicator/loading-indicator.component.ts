import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  loading: boolean = false;


  constructor(private loadingSerice: LoadingIndicatorService) { }

  ngOnInit(): void {

    this.loadingSerice.loading.subscribe((state: boolean) => {
      this.loading = state;
    });

  }

}
