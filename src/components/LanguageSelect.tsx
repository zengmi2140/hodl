import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES, getSafeLanguage } from '../config/languages';

const getLabelFor = (lng: string): string => {
  const safeLang = getSafeLanguage(lng);
  const match = SUPPORTED_LANGUAGES.find(o => o.code === safeLang);
  return match ? match.label : 'English';
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

  const currentSafe = getSafeLanguage(i18n.resolvedLanguage, i18n.language);
  const currentLabel = getLabelFor(currentSafe);

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
          {SUPPORTED_LANGUAGES.filter(opt => opt.code !== currentSafe).map(opt => (
            <li
              key={opt.code}
              role="option"
              aria-selected={false}
              className="lang-select__option"
              onClick={() => handleSelect(opt.code)}
            >
              <span className="lang-select__option-label">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
