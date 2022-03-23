import { es_bckup } from "./es";
import { en_bckup } from "./en";

let en_Lang, es_Lang;
if (LANG_EN) {
  en_Lang = LANG_EN;
} else {
  en_Lang = en_bckup;
}
if (LANG_ES) {
  es_Lang = LANG_ES;
} else {
  es_Lang = es_bckup;
}
const en = en_Lang;
const es = es_Lang;

export const dictionaryList = {
  es,
  en,
};

export const languageOptions = [
  { id: "es", text: "Castellano" },
  { id: "en", text: "English" },
];
