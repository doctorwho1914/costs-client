import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CostAddComponent} from './cost-add/cost-add.component';
import {CostListComponent} from './cost-list/cost-list.component';


const routes: Routes = [
  {
    path: '', component: CostAddComponent, pathMatch: 'full',
  },
  {
    path: 'cost-list', component: CostListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
