import store from '../store';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const locales = {
  'ru-RU':ru,
  'en-US':en,
}

export default  function localizeFilter(key, ...args){
  const locale =  store.getters.info.locale || 'ru-RU';
  let localized = locales[locale][key] || `[Localize error]: key ${key} not found`;

  if (args && locales[locale][key]) {
    args.forEach(arg => localized = localized.replace('%slot%', arg))
    return localized
  }
  return localized
}
