import { Component, OnDestroy, OnInit } from '@angular/core';

import { EMPTY, interval, Observable, Subscription } from 'rxjs';
import { catchError, map, mergeMap, startWith } from 'rxjs/operators';

import { ECurrency } from './enums';
import { ICurrencyRate } from './interfaces';
import { CurrencyJSONParser, CurrencyParser, CurrencyXMLParser } from './models';
import { CurrencyService } from './services/currency.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private watcher$: Observable<ICurrencyRate>;
  private watcherSubscription: Subscription;
  private selectedSourceIndex = 0;
  private sources: CurrencyParser[] = [
    new CurrencyJSONParser('https://www.cbr-xml-daily.ru/daily_json.js', 1),
    new CurrencyXMLParser('https://www.cbr-xml-daily.ru/daily_utf8.xml', 2)
  ];

  constructor(private readonly currency: CurrencyService) {

    /**
     * Сортировка массива источников данных
     */
    this.sources.sort((a: CurrencyParser, b: CurrencyParser) =>
      a.order > b.order ? 1 : a.order < b.order ? -1 : 0
    );

    /**
     * Таймер опроса источников данных
     */
    this.watcher$ = interval(environment.refreshInterval).pipe(
      startWith(0),
      mergeMap((source) =>
        this.currency.getSummary(this.sources[this.selectedSourceIndex].url).pipe(
          map((response: string) => this.sources[this.selectedSourceIndex].parse(response, ECurrency.EUR)),
          catchError(() => {
            this.selectedSourceIndex = this.selectedSourceIndex + 1 <= this.sources.length - 1
              ? this.selectedSourceIndex + 1
              : 0;
            return EMPTY;
          }),
        )),
    );
  }

  ngOnInit(): void {
    /**
     * Подписка на таймер опроса источников данных
     */
    this.watcherSubscription = this.watcher$.subscribe();
  }

  ngOnDestroy(): void {
    /**
     * Отписка от таймера опроса источников данных
     */
    this.watcherSubscription.unsubscribe();
  }
}
