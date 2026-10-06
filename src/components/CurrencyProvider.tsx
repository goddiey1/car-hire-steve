"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'KSh' | 'USD' | 'GBP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convertPrice: (basePriceInKsh: number) => { amount: string | number; symbol: string; code: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const rates = {
  KSh: 130, // 1 USD = 130 KES
  USD: 1,
  GBP: 0.78 // 1 USD = 0.78 GBP
};

const symbols = {
  KSh: 'KSh',
  USD: '$',
  GBP: '£'
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('KSh');

  const convertPrice = (basePriceInKsh: number) => {
    let amount = basePriceInKsh;
    if (currency === 'USD') amount = Math.round(basePriceInKsh / 130);
    if (currency === 'GBP') amount = Math.round(basePriceInKsh / 166);
    
    return { amount: amount.toLocaleString(), symbol: symbols[currency], code: currency };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
