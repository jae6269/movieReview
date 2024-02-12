import { createContext, useContext, useState } from 'react';

const LocaleContext = createContext();

export function LocaleProvider({ defaltValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaltValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 locale provider 안에서 사용해주세요');
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('반드시 locale provider 안에서 사용해주세요');
  }
  return context.setLocale;
}

export default LocaleContext;
