import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RestService {
  endpoint = `${environment.api}/orders`;

  export(): Observable<any> {
    return this.http.post(`${environment.api}/export`, {}, {responseType: 'blob'});
  }

  chart(): Observable<any> {
    return this.http.get(`${environment.api}/chart`);
  }
}
