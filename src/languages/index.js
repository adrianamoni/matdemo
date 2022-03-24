import { es_bckup } from "./es";
import { en_bckup } from "./en";

let en_Lang, es_Lang;
if (typeof LANG_EN != "undefined") {
  console.log("LANG_EN1", LANG_EN);
}
if (typeof LANG_ES != "undefined") {
  console.log("LANG_ES1", LANG_ES);
}
if (LANG_EN) {
  console.log("LANG_EN2", LANG_EN);
  en_Lang = LANG_EN;
} else {
  console.log("en_bckup", en_bckup);
  en_Lang = en_bckup;
}
if (LANG_ES) {
  console.log("LANG_ES2", LANG_ES);
  es_Lang = LANG_ES;
} else {
  console.log("en_bckup", en_bckup);
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
