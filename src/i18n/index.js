import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import hi from './hi.json';
import de from './de.json';
import zh from './zh.json';
import ja from './ja.json';
import bho from './bho.json';
import mr from './mr.json';
import ta from './ta.json';
import te from './te.json';
import bn from './bn.json';

const resources = {
    en: { translation: en },
    hi: { translation: hi },
    de: { translation: de },
    zh: { translation: zh },
    ja: { translation: ja },
    bho: { translation: bho },
    mr: { translation: mr },
    ta: { translation: ta },
    te: { translation: te },
    bn: { translation: bn }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
