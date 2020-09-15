import { CurrencyParser } from './currency-parser.model';
import { ICurrencyRate, ICurrencySummaryJSON } from '../interfaces';
import { ECurrency } from '../enums';

/**
 * Парсер сводки курсов валют в формате JSON
 */
export class CurrencyJSONParser extends CurrencyParser {
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
    const json: ICurrencySummaryJSON = JSON.parse(data);
    return json.Valute[currency] ? json.Valute[currency] : null;
  }
}
