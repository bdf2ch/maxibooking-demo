import * as parser from 'fast-xml-parser';

import { CurrencyParser } from './currency-parser.model';
import { ICurrencyRate, ICurrencySummaryXML } from '../interfaces';
import { ECurrency } from '../enums';

/**
 * Парсер сводки курсов валют в формате XML
 */
export class CurrencyXMLParser extends CurrencyParser {
  /**
   * Конструктор
   * @param url - URL источника данных
   * @param order - Порядок опроса источника данных
   */
  constructor(url: string, order: number) {
    super(url, order);
  }

  /**
   * Обработка данных, полученных от источника и получение курса валюты
   * @param data - Данные, полученные от источника данных
   * @param currency - Валюта
   */
  parse(data: string, currency: ECurrency): ICurrencyRate {
    try {
      const json: ICurrencySummaryXML = parser.parse(data);
      const rate = json.ValCurs.Valute.find((item: ICurrencyRate) => item.CharCode === currency);
      return rate ? rate : null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
