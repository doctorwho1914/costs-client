import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CostsService } from '../services/costs.service';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

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
  statistic: any[];

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
        this.categories = data;
      });
    Promise.all([
      this.costsService.getStatistic({
        fromDate: moment().startOf('month').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
      }),
      this.costsService.getStatistic({
        fromDate: moment().startOf('week').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
      })
    ])
      .then(data => {
        console.log(data);
        this.statistic = data[0].map((e, index) => {
          return {
            id: e.id,
            name: e.name,
            monthSum: e.sum,
            weekSum: data[1][index].sum,
          };
        });
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
