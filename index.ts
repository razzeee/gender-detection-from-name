// @ts-check

import { enNames } from "./names/en";
import { itNames } from "./names/it";
import { esNames } from "./names/es";
import { frNames } from "./names/fr";
import { deNames } from "./names/de";
import { trNames } from "./names/tr";

/**
 * Gender detection from first name and optional language
 * @param {String} name First name
 * @param {String} [lang] Language
 * @return {String} male, female, unknown
 */
export function getGender(
  name: string,
  lang: "all" | "en" | "it" | "es" | "fr" | "de" | "tr" = "all"
): "male" | "female" | "unknown" {
  if (!name) {
    return "unknown";
  }

  // Lowercase name and lang to make the match
  name = name.toLowerCase();
  lang = lang || "all";

  const maps = {
    en: enNames,
    it: itNames,
    es: esNames,
    fr: frNames,
    de: deNames,
    tr: trNames,
  };

  const mapToUse = maps[lang as keyof typeof maps];
  const primaryResult = mapToUse ? mapToUse.get(name) : null;

  return (
    primaryResult ||
    trNames.get(name) ||
    deNames.get(name) ||
    frNames.get(name) ||
    esNames.get(name) ||
    enNames.get(name) ||
    itNames.get(name) ||
    "unknown"
  );
}
