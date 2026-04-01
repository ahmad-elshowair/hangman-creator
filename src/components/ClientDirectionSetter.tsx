"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function ClientDirectionSetter() {
  const locale = useLocaleStore((state) => state.locale);
  const direction = useLocaleStore((state) => state.direction);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  return null;
}
