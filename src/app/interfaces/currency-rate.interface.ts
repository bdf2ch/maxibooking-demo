/**
 * Интерфейс, описывающий курс валюты
 */
export interface ICurrencyRate {
  ID: string;           // Идентификатор
  NumCode: string;      // Код
  CharCode: string;     // Литера
  Nominal: number;      // Номинал
  Name: string;         // Наименование валюты
  Value: number;        // Курс
  Previous: number;     // Предыдущий курс
}
