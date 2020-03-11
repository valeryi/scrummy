import { Component, OnInit } from '@angular/core';
import { category, ICategory } from './data';
import { Router } from '@angular/router';
import { Sortable, Swap } from 'sortablejs';

@Component({
  selector: 'app-word-category',
  templateUrl: './word-category.component.html',
  styleUrls: ['./word-category.component.scss']
})
export class WordCategoryComponent implements OnInit {

  categories: ICategory[] = category;
  filteredCategories: ICategory[] = [];

  constructor(
    private router: Router
  ) {

    this.sortBy('position');

  }

  sortBy(sortBy: string) {
    console.log('sorting...');
    this.filteredCategories = this.categories.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  ngOnInit(): void {
    const table = document.querySelector('table');

    Sortable.mount(new Swap());
    const sortable: Sortable = new Sortable(table.querySelector('tbody'), {
      swap: true,
      draggable: 'tr',
      animation: 350,
      swapClass: 'draggable-ghost',
      handle: '.fa-arrows',
      onSort: this.updatingTableOnChange
    });

    table.addEventListener('click', this.tableEvents.bind(this));
  }

  private tableEvents(e: MouseEvent): void {
    e.preventDefault();

    const target = e.target as HTMLTableElement;
    const row: HTMLElement = this.findTableRow(target);
    const id: string = row.id;

    if (id.length > 0) {
      this.clickRedirect(id);
    } else {
      // TODO: Add redirect to 404 Page
      console.log('invalid ID!!!');
    }

  }

  private findTableRow(target: HTMLElement): HTMLElement {

    if (target.tagName === 'TR') {
      return target;
    }

    return this.findTableRow(target.parentElement);

  }

  private clickRedirect(id: string) {

    this.router.navigate(['/category', id]);

  }

  private updatingTableOnChange(evt: any) {
    const list = evt.srcElement.rows;

    for (let i = 0; i < list.length; i++) {
      // Updating table order
      list[i].children[0].innerHTML = i + 1;

      // Updating strip class
      if (i % 2) {
        list[i].classList.add('odd');
      } else {
        list[i].classList.remove('odd');
      }
    }
  }

}
