export interface LanguageOption {
  code: string;       // 标准语言代码，如 'en', 'zh-CN', 'zh-TW', 'ja', 'es'
  label: string;      // 完整名称，如 'English', '简体中文', '繁體中文'
  shortLabel: string; // 移动端顶栏显示缩写，如 'EN', '简', '繁'
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
  { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
];

export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code);

// i18next 精确回退策略：防止 zh/zh-HK/zh-SG 等地区代码找不到对应目录而触发 404/SPA Rewrite 变成 HTML
export const FALLBACK_LNG_CONFIG = {
  'zh': ['zh-CN'],
  'zh-Hans': ['zh-CN'],
  'zh-SG': ['zh-CN'],
  'zh-HK': ['zh-TW'],
  'zh-Hant': ['zh-TW'],
  'default': [DEFAULT_LANGUAGE],
};

// 获取已解析的安全语言代码（优先使用 i18n.resolvedLanguage）
export const getSafeLanguage = (resolvedLang?: string, currentLang?: string): string => {
  const lang = resolvedLang || currentLang || DEFAULT_LANGUAGE;
  if (SUPPORTED_LANGUAGE_CODES.includes(lang)) return lang;
  
  const lower = lang.toLowerCase();
  if (lower.startsWith('zh')) {
    return lower.includes('tw') || lower.includes('hk') || lower.includes('hant') ? 'zh-TW' : 'zh-CN';
  }
  
  const prefix = lang.split('-')[0].toLowerCase();
  const match = SUPPORTED_LANGUAGES.find(l => l.code.toLowerCase().startsWith(prefix));
  return match ? match.code : DEFAULT_LANGUAGE;
};
