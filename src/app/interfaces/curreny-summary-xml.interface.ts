import { ICurrencyRate } from './currency-rate.interface';

/**
 * Интерфейс, описывающий сводку курсов валют в формате XML
 */
export interface ICurrencySummaryXML {
  ValCurs: {
    Valute: ICurrencyRate[];   // Сводка курсов валют
  };
}
