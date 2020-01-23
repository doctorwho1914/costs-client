import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CostsService} from '../services/costs.service';
import {CategoryService} from '../services/category.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
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
    this.addCostForm.reset();
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
          this.toastr.success('Готово');
          this.load();
        });
    }
  }

}
