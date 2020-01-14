import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CostsService} from './services/costs.service';
import {HttpClientModule} from '@angular/common/http';
import {CategoryService} from './services/category.service';
import {CostListComponent} from './cost-list/cost-list.component';
import {CostAddComponent} from './cost-add/cost-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CostListComponent,
    CostAddComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CostsService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
