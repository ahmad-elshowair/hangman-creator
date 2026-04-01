import { create } from "zustand";
import { persist } from "zustand/middleware";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
// no local imports here

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

type Messages = typeof en;

interface LocaleStoreState {
  locale: Locale;
  direction: Direction;
  hasHydrated: boolean;
  setLocale: (locale: Locale) => void;
  setHasHydrated: (state: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, params?: Record<string, any>) => string;
}

const dictionaries: Record<Locale, Messages> = {
  en,
  ar,
};

export const useLocaleStore = create<LocaleStoreState>()(
  persist(
    (set, get) => ({
      locale: "en",
      direction: "ltr",
      hasHydrated: false,
      setLocale: (locale) => set({ locale, direction: locale === "ar" ? "rtl" : "ltr" }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      t: (key, params) => {
        const { locale } = get();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messages = dictionaries[locale] as any;
        const keys = key.split(".");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = messages;
        
        for (const k of keys) {
          if (result && typeof result === "object" && k in result) {
            result = result[k];
          } else {
            return key;
          }
        }
        
        if (typeof result !== "string") return key;
        
        if (params) {
          return Object.entries(params).reduce(
            (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
            result
          );
        }
        
        return result;
      },
    }),
    {
      name: "hangman-locale",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
