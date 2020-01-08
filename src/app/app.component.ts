import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CostsService} from './services/costs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'costs-client';
  addCostForm: FormGroup;
  costs: any[];

  constructor(
    private costsService: CostsService
  ) {
    this.addCostForm = new FormGroup({
      category: new FormControl(''),
      value: new FormControl(''),
      description: new FormControl(''),
    });
    this.load();
  }

  load() {
    this.costsService.list()
      .then(data => {
        console.log(data);
        this.costs = data;
      });
  }

  save() {
    if (confirm('Добавить курс?')) {
      this.costsService.add(this.addCostForm.value);
    }
  }
}
