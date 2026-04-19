import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './LanguageSelect';

interface HeaderProps {
  completionPercentage: number;
  maxProgress?: number;
  onOpenFaq: () => void;
  layoutLeftEdge?: number;
  layoutRightEdge?: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  completionPercentage,
  maxProgress = 120,
  onOpenFaq,
  layoutLeftEdge,
  layoutRightEdge,
  theme,
  onToggleTheme,
}) => {
  const { t } = useTranslation();

  // Progress ruler width — keep the prior responsive sizing
  const GAP_FROM_BUTTONS = 24;
  const BUTTON_WIDTH = 72;

  const calculateProgressMaxWidth = (): number | null => {
    if (layoutLeftEdge === undefined || layoutRightEdge === undefined) return null;
    const pageCenter = window.innerWidth / 2;
    const leftButtonRight = layoutLeftEdge + BUTTON_WIDTH + GAP_FROM_BUTTONS;
    const rightButtonLeft = layoutRightEdge - BUTTON_WIDTH - GAP_FROM_BUTTONS;
    const leftHalfSpace = pageCenter - leftButtonRight;
    const rightHalfSpace = rightButtonLeft - pageCenter;
    const halfWidth = Math.min(leftHalfSpace, rightHalfSpace);
    return Math.min(Math.max(halfWidth * 2, 240), 720);
  };

  const progressMaxWidth = calculateProgressMaxWidth();

  // Cursor position on the ruler (clamped 0–100% of visible track).
  const cursorPercent = Math.min(
    Math.max((completionPercentage / maxProgress) * 100, 0),
    100,
  );

  const isOptimal =
    completionPercentage === 120 ||
    completionPercentage === 130 ||
    completionPercentage === 150;

  const getButtonsRight = (): string | undefined => {
    if (layoutRightEdge === undefined) return undefined;
    return `${window.innerWidth - layoutRightEdge}px`;
  };

  // Ruler tick marks (0, 20, 40, …, maxProgress)
  const tickStep = 20;
  const ticks: number[] = [];
  for (let v = 0; v <= maxProgress; v += tickStep) ticks.push(v);

  return (
    <header className="header bp-header">
      {/* Right-side actions — drafting toolbar */}
      <div className="header-actions" style={{ right: getButtonsRight() }}>
        <LanguageSelect />
        <button className="header-btn" onClick={onOpenFaq} aria-label={t('header.viewFaq')}>
          {t('common.faq')}
        </button>
        <button
          className="header-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      <div className="header-content">
        {/* Title block — architectural drawing convention */}
        <div className="bp-title-block">
          <div className="bp-title-block__main">
            <span className="bp-title-block__signal">₿</span>
            <span className="bp-title-block__name">{t('header.title')}</span>
          </div>
          <div className="bp-title-block__meta">
            <span>SHEET&nbsp;01/01</span>
            <span className="bp-title-block__sep">·</span>
            <span>SCALE&nbsp;1:1</span>
            <span className="bp-title-block__sep">·</span>
            <span>REV.&nbsp;A</span>
          </div>
        </div>

        {/* Progress ruler */}
        <div
          className="progress-section bp-ruler-section"
          style={progressMaxWidth ? { maxWidth: `${progressMaxWidth}px` } : undefined}
        >
          <div className={`bp-ruler ${isOptimal ? 'optimal' : ''}`}>
            {/* Ruler baseline + ticks */}
            <div className="bp-ruler__track">
              {ticks.map((v) => {
                const left = (v / maxProgress) * 100;
                const isMajor = v % 40 === 0;
                return (
                  <div
                    key={v}
                    className={`bp-ruler__tick ${isMajor ? 'major' : ''}`}
                    style={{ left: `${left}%` }}
                  >
                    <span className="bp-ruler__tick-mark" />
                    {isMajor && <span className="bp-ruler__tick-label">{v}</span>}
                  </div>
                );
              })}
              {/* Progress fill bar */}
              <div className="bp-ruler__fill" style={{ width: `${cursorPercent}%` }} />
              {/* Cursor (▼) */}
              <div className="bp-ruler__cursor" style={{ left: `${cursorPercent}%` }}>
                <span className="bp-ruler__cursor-mark">▼</span>
              </div>
            </div>
          </div>
          <div className="progress-info">
            <span className={`progress-percentage ${isOptimal ? 'optimal' : ''}`}>
              {completionPercentage}%
              {isOptimal && <span className="bp-ruler__optimal-flag"> ◉ OPTIMAL</span>}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
