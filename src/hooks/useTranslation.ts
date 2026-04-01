import { useLocaleStore } from "@/store/useLocaleStore";

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale);
  const t = useLocaleStore((state) => state.t);
  
  return { t, locale };
}
