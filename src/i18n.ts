import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-CN',
    supportedLngs: ['zh-CN', 'zh-TW', 'en', 'es', 'de', 'zh'],
    load: 'currentOnly',
    nonExplicitSupportedLngs: true,
    
    // 默认命名空间
    defaultNS: 'translation',

    // 调试模式 (仅开发环境)
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: true,
    }
  });

export default i18n;
