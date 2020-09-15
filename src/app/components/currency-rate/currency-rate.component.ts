import { Component, Input, OnInit } from '@angular/core';
import { ICurrencyRate } from '../../interfaces';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.less']
})
export class CurrencyRateComponent implements OnInit {
  @Input() rate: ICurrencyRate;

  constructor() { }

  ngOnInit() {
  }

}
