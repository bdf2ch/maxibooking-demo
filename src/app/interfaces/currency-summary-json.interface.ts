import { ICurrencyRate } from './currency-rate.interface';

/**
 * Интерфейс, описывающий сводку курсов валют в формате JSON
 */
export interface ICurrencySummaryJSON {
  Date: Date;                                     // Дата
  PreviousDate: Date;                             // Предыдущая дата
  PreviousUrl: RegExp;                            // URL предыдущей сводки
  Timestamp: Date;                                // Дата и время сводки
  Valute: {[currency: string]: ICurrencyRate};    // Сводка курсов валют
}
