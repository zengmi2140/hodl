import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageOption {
  value: string;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', label: 'ENGLISH' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
];

const getLabelFor = (lng: string): string => {
  const match = LANGUAGE_OPTIONS.find(o => o.value === lng || lng.startsWith(o.value));
  if (match) return match.label;
  if (lng.toLowerCase().includes('tw')) return '繁體中文';
  if (lng.toLowerCase().includes('cn') || lng.toLowerCase().startsWith('zh')) return '简体中文';
  return 'ENGLISH';
};

const LanguageSelect: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const currentLabel = getLabelFor(i18n.language);

  const handleSelect = (value: string) => {
    i18n.changeLanguage(value);
    setOpen(false);
  };

  return (
    <div className="lang-select" ref={ref}>
      <button
        type="button"
        className={`lang-select__trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('header.selectLang')}
      >
        <span className="lang-select__label">{currentLabel}</span>
        <span className="lang-select__caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="lang-select__menu" role="listbox">
          {LANGUAGE_OPTIONS.map(opt => {
            const isActive = i18n.language === opt.value || i18n.language.startsWith(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isActive}
                className={`lang-select__option ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className="lang-select__check" aria-hidden="true">
                  {isActive ? '✓' : ''}
                </span>
                <span className="lang-select__option-label">{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
