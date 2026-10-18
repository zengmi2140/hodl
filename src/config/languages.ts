export interface LanguageOption {
  code: string;       // 标准语言代码，如 'en', 'zh-CN', 'zh-TW', 'ja', 'es'
  label: string;      // 完整名称，如 'ENGLISH', '简体中文', '繁體中文'
  shortLabel: string; // 移动端顶栏显示缩写，如 'EN', '简', '繁'
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'ENGLISH', shortLabel: 'EN' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '简' },
  { code: 'zh-TW', label: '繁體中文', shortLabel: '繁' },
];

export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code);

// 将任意语言代码映射到受支持的语言；无法匹配时返回 undefined
export const matchSupportedLanguage = (lang: string): string | undefined => {
  if (SUPPORTED_LANGUAGE_CODES.includes(lang)) return lang;

  const lower = lang.toLowerCase();
  if (lower.startsWith('zh')) {
    return lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant') ? 'zh-TW' : 'zh-CN';
  }

  const prefix = lower.split('-')[0];
  return SUPPORTED_LANGUAGES.find(l => l.code.toLowerCase().split('-')[0] === prefix)?.code;
};

// 获取已解析的安全语言代码（优先使用 i18n.resolvedLanguage）
export const getSafeLanguage = (resolvedLang?: string, currentLang?: string): string => {
  const lang = resolvedLang || currentLang || DEFAULT_LANGUAGE;
  return matchSupportedLanguage(lang) ?? DEFAULT_LANGUAGE;
};
