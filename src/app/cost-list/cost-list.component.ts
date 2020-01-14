import {Component, OnInit} from '@angular/core';
import {CostsService} from '../services/costs.service';
import {CategoryService} from '../services/category.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cost-list',
  templateUrl: './cost-list.component.html',
  styleUrls: ['./cost-list.component.scss']
})
export class CostListComponent implements OnInit {
  title = 'Cost List';
  addCostForm: FormGroup;
  costs: any[];
  categories: any[];

  constructor(
    private costsService: CostsService,
    private categoryService: CategoryService,
  ) {
    this.load();

  }

  ngOnInit() {
  }

  load() {
    this.costsService.list()
      .then(data => {
        console.log(data);
        this.costs = data;
      });
    this.categoryService.list()
      .then(data => {
        console.log(data);
        this.categories = data;
      });
  }


  remove(id: number): void {
    if (confirm('Точно удалить?')) {
      this.costsService.remove(id)
        .then(e => {
          this.load();
        });
    }
  }

}
