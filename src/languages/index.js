/* import es from "./es";
import en from "./en"; */

const en = LANG_EN;
const es = LANG_ES;
console.log("en", en);
console.log("es", es);
//**Languages files are located in: /public/languages */
/* export const dictionaryList = {
  es: window.LANG_ES,
  en: window.LANG_EN,
}; */
export const dictionaryList = {
  es,
  en,
};

export const languageOptions = [
  { id: "es", text: "Castellano" },
  { id: "en", text: "English" },
];
