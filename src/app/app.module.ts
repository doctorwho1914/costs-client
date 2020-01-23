import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostsService } from './services/costs.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { CostListComponent } from './cost-list/cost-list.component';
import { CostAddComponent } from './cost-add/cost-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CostsService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
