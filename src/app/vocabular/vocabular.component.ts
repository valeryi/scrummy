import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vocabular',
  templateUrl: './vocabular.component.html',
  styleUrls: ['./vocabular.component.scss']
})
export class VocabularComponent implements OnInit {
  // TODO: <LEARNING> Figure out why in Angular I can declare a property not defining them in a constructor, but in TypeScript I cannot
  private id: string;

  constructor(
    private route: ActivatedRoute
  ) {

    // TODO: <LEARNING> Find out all possible ways to send and get parameters via URL
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

  }

  ngOnInit(): void {

  }

}
