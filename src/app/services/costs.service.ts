import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CostsService {

  constructor(private http: HttpClient) {
  }

  list(options?: any) {
    return this.http.get<any>(`/api/cost`, {params: options}).toPromise();
  }

  add(data: any) {
    return this.http.post<any>(`/api/cost`, data).toPromise();
  }

  remove(id: number) {
    return this.http.delete<any>(`/api/cost/` + id, {}).toPromise();
  }
}
