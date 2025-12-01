import i18n from "@/i18n/config";
import { TranslatedString } from "@/types";

/**
 * Получает переведенное значение из строки или объекта с переводами
 * @param value - строка или объект с переводами {ru, en, kk}
 * @returns переведенная строка
 */
export const getTranslatedValue = (value: TranslatedString | undefined): string => {
  if (!value) return "";
  
  // Если это строка, возвращаем как есть
  if (typeof value === "string") {
    return value;
  }
  
  // Если это объект с переводами, возвращаем значение для текущего языка
  const currentLang = i18n.language || "ru";
  const langMap: Record<string, "ru" | "en" | "kk"> = {
    ru: "ru",
    en: "en",
    kk: "kk",
  };
  
  const lang = langMap[currentLang] || "ru";
  return value[lang] || value.ru || "";
};

