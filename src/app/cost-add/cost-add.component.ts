import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CostsService} from '../services/costs.service';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrls: ['./cost-add.component.scss']
})
export class CostAddComponent {
  title = 'Add Cost';
  addCostForm: FormGroup;
  costs: any[];
  categories: any[];

  constructor(
    private costsService: CostsService,
    private categoryService: CategoryService,
  ) {
    this.addCostForm = new FormGroup({
      categoryId: new FormControl(''),
      value: new FormControl(''),
      description: new FormControl(''),
      createdAt: new FormControl(''),
    });
    this.load();
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

  save(): void {
    if (confirm('Добавить трату?')) {
      this.costsService.add(this.addCostForm.value)
        .then(e => {
          this.load();
        });
    }
  }

}
