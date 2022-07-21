import { i18n } from "@lingui/core";
import { en, cs, uk} from 'make-plural/plurals'

export const locales = {
  en: "English",
  cs: "Česky",
  uk: "Urkainian",
};
export const defaultLocale = "en";

i18n.loadLocaleData({
  en: { plurals: en },
  cs: { plurals: cs },
  uk: { plurals: uk },
})

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  let messages ={}
  if(locale === 'uk'){
    messages = {
      pluralsExample: 'множественный пример',
      increment: 'Добавить',
      decrement: 'Уменьшить',
      'Today is {0}': 'Сегодня {0}',
      "books": [
        [
          "count",
          "plural",
          {
            "one":"Одна книга",
            "other":["Много ","#"," книг"]
          }]
      ],
      dataFromat: 'Пример форматирования даты'
    }
  } else {
    const data = await import(`@lingui/loader!./locales/${locale}/messages.po`)
    messages = data.messages
  }
  i18n.load(locale, messages);
  i18n.activate(locale);
}

// If not we can just load all the catalogs and do a simple i18n.active(localeToActive)
// i18n.load({
//   en: messagesEn,
//   cs: messagesCs,
// });
