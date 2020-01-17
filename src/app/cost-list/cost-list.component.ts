import {Component, OnInit} from '@angular/core';
import {CostsService} from '../services/costs.service';
import {CategoryService} from '../services/category.service';
import {FormGroup} from '@angular/forms';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

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
  model;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private costsService: CostsService,
    private categoryService: CategoryService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getPrev(calendar.getToday(), 'd', (new Date()).getDate() - 1);
    this.toDate = calendar.getToday();
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.costsService.list({
      fromDate: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`,
      toDate: `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
    })
      .then(data => {
        this.costs = data;
      });
    this.categoryService.list()
      .then(data => {
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

  onDateSelection(date: NgbDate) {
    console.log(date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.load();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
