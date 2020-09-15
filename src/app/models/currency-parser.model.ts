import { ICurrencyRate } from '../interfaces';
import { ECurrency } from '../enums';

/**
 * Абстрактный класс, реализующий логику парсера сводки курсов валют
 */
export abstract class CurrencyParser {
  public readonly url: string;                 // URL источника данных
  public readonly order: number;               // Порядок опроса источника данных

  /**
   * Конструктор
   * @param url - URL источника данных сводки
   * @param order - Порядок опроса источника данных
   */
  protected constructor(url: string, order: number) {
    this.url = url;
    this.order = order;
  }

  /**
   * Обработка данных, полученных от источника и получение курса валюты
   * @param data - Данные, полученные от источника данных
   * @param currency - Валюта
   */
  abstract parse(data: string, currency: ECurrency): ICurrencyRate;
}

