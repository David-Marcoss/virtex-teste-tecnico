import type { ISelectOptions } from "@/shared/interfaces/ISelectOptions";
import { Api } from "../axios-config";

export const MoneyConversorService = {
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const response = await Api.get(`/${fromCurrency}`);
    const rate = response.data.rates[toCurrency];

    if (!rate) {
      throw new Error(
        `Taxa de conversão de ${fromCurrency} para ${toCurrency} não encontrada.`
      );
    }

    return amount * rate;
  },

  async getAvailableCurrencies(): Promise<ISelectOptions[]> {
    const response = await Api.get(`/USD`); // pode ser qualquer moeda base
    const currencies = Object.keys(response.data.rates);

    return currencies.map((currency) => ({
      label: currency,
      value: currency,
    }));
  },

  async getConversionRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const response = await Api.get(`/${fromCurrency}`);
    const rate = response.data.rates[toCurrency];

    if (!rate) {
      throw new Error(
        `Taxa de conversão de ${fromCurrency} para ${toCurrency} não encontrada.`
      );
    }

    return rate;
  },
};
