import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<any>(`/api/category`).toPromise();
  }

}
