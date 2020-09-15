import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private readonly http: HttpClient) {}

  /**
   * Получение сводки курсов валют от источника данных
   * @param url - URL источника данных
   */
  getSummary(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'});
  }
}
