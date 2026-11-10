'use client';

import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

export type CurrencyCode = 'EGP' | 'USD' | 'EUR' | 'SAR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  symbolAr: string;
  nameEn: string;
  nameAr: string;
  rateFromUSD: number;
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  EGP: {
    code: 'EGP',
    symbol: 'EGP',
    symbolAr: 'ج.م',
    nameEn: 'Egyptian Pound',
    nameAr: 'جنيه مصري',
    rateFromUSD: 50.0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    symbolAr: '$',
    nameEn: 'US Dollar',
    nameAr: 'دولار أمريكي',
    rateFromUSD: 1.0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    symbolAr: '€',
    nameEn: 'Euro',
    nameAr: 'يورو',
    rateFromUSD: 0.92,
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    symbolAr: 'ر.س',
    nameEn: 'Saudi Riyal',
    nameAr: 'ريال سعودي',
    rateFromUSD: 3.75,
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    symbolAr: 'د.إ',
    nameEn: 'UAE Dirham',
    nameAr: 'درهم إماراتي',
    rateFromUSD: 3.67,
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convertFromUSD: (usdAmount: number) => number;
  formatPrice: (
    usdAmount: number,
    opts?: { minimumFractionDigits?: number; maximumFractionDigits?: number; isArabic?: boolean }
  ) => string;
  currencySymbol: string;
  currencyConfig: CurrencyConfig;
  allCurrencies: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to EGP for the Egyptian fashion house experience
  const [currency, setCurrencyState] = useState<CurrencyCode>('EGP');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('novawear_currency') as CurrencyCode | null;
      if (saved && (saved in CURRENCY_CONFIGS)) {
        setCurrencyState(saved);
      } else {
        setCurrencyState('EGP');
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    if (code in CURRENCY_CONFIGS) {
      setCurrencyState(code);
      try {
        localStorage.setItem('novawear_currency', code);
      } catch {
        // ignore
      }
    }
  };

  const convertFromUSD = useCallback(
    (usdAmount: number): number => {
      const rate = CURRENCY_CONFIGS[currency]?.rateFromUSD ?? 1;
      return usdAmount * rate;
    },
    [currency]
  );

  const formatPrice = useCallback(
    (
      usdAmount: number,
      opts: { minimumFractionDigits?: number; maximumFractionDigits?: number; isArabic?: boolean } = {}
    ): string => {
      const isArabic =
        opts.isArabic !== undefined
          ? opts.isArabic
          : typeof document !== 'undefined'
          ? document.documentElement.lang === 'ar'
          : true;

      const {
        minimumFractionDigits = currency === 'USD' || currency === 'EUR' ? 2 : 0,
        maximumFractionDigits = currency === 'USD' || currency === 'EUR' ? 2 : 0,
      } = opts;

      const amount = convertFromUSD(usdAmount);
      const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.EGP;
      const symbol = isArabic ? config.symbolAr : config.symbol;

      const formatter = new Intl.NumberFormat(isArabic ? 'ar-EG-u-nu-latn' : 'en-US', {
        minimumFractionDigits,
        maximumFractionDigits,
      });

      const formattedNumber = formatter.format(amount);

      if (currency === 'USD') {
        return isArabic ? `${formattedNumber} $` : `$${formattedNumber}`;
      }
      if (currency === 'EUR') {
        return isArabic ? `${formattedNumber} €` : `€${formattedNumber}`;
      }

      // EGP, SAR, AED
      return `${formattedNumber} ${symbol}`;
    },
    [currency, convertFromUSD]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertFromUSD,
        formatPrice,
        currencySymbol: CURRENCY_CONFIGS[currency]?.symbol || 'EGP',
        currencyConfig: CURRENCY_CONFIGS[currency],
        allCurrencies: ['EGP', 'USD', 'EUR', 'SAR', 'AED'],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
