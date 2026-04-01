import { create } from "zustand";
import { persist } from "zustand/middleware";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

type Messages = typeof en;

/** Recursive type representing a JSON dictionary value (string or nested object). */
type MessageValue = string | { [key: string]: MessageValue };

interface LocaleStoreState {
  locale: Locale;
  direction: Direction;
  hasHydrated: boolean;
  setLocale: (locale: Locale) => void;
  setHasHydrated: (state: boolean) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const dictionaries: Record<Locale, Messages> = {
  en,
  ar,
};

/**
 * Factory that creates a translator function bound to a specific locale.
 * Returning a new function reference on each call ensures Zustand detects
 * the change and re-renders all subscribing components.
 */
function createTranslator(
  locale: Locale,
): (key: string, params?: Record<string, string | number>) => string {
  return (key, params) => {
    const messages: MessageValue = dictionaries[locale];
    const keys = key.split(".");
    let result: MessageValue = messages;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, MessageValue>)[k];
      } else {
        return key;
      }
    }

    if (typeof result !== "string") return key;

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
        result,
      );
    }

    return result;
  };
}

export const useLocaleStore = create<LocaleStoreState>()(
  persist(
    (set) => ({
      locale: "en",
      direction: "ltr",
      hasHydrated: false,
      setLocale: (locale) =>
        set({
          locale,
          direction: locale === "ar" ? "rtl" : "ltr",
          t: createTranslator(locale),
        }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      t: createTranslator("en"),
    }),
    {
      name: "hangman-locale",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
          useLocaleStore.setState({ t: createTranslator(state.locale) });
        }
      },
    },
  ),
);

