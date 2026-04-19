import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderMobileProps {
  completionPercentage: number;
  maxProgress?: number;
  onOpenFaq: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  completionPercentage,
  maxProgress = 120,
  onOpenFaq,
  theme,
  onToggleTheme
}) => {
  const { t, i18n } = useTranslation();

  const getProgressColor = (percentage: number): string => {
    if (percentage === 0) return '#fbbf24';
    if (percentage <= 60) return '#ffcc80';
    if (percentage <= 100) return '#ffb74d';
    if (percentage <= 120) return '#F7931A';
    if (percentage <= 130) return '#F7931A';
    if (percentage <= 150) return '#ff6b00';
    return '#fbbf24';
  };

  const adjustedProgressColor = theme === 'dark' && completionPercentage <= 100
    ? getProgressColor(completionPercentage)
    : getProgressColor(completionPercentage);

  // 计算进度条显示宽度（按最大进度值比例缩放）
  const getProgressBarWidth = (): number => {
    return Math.min((completionPercentage / maxProgress) * 100, 100);
  };

  // 判断是否显示庆祝emoji
  const showCelebration = completionPercentage >= 120;
  // 判断是否显示灰色延伸区域（仅单签100%时）
  const showGrayExtension = completionPercentage === 100;
  // 判断是否为多签高进度
  const isMultisigHighProgress = completionPercentage === 130 || completionPercentage === 150;

  return (
    <header className="header-mobile">
      <div className="header-mobile__content">
        <div 
          className="header-mobile__icon header-mobile__icon--left"
          style={{ left: '12px' }}
        >
           <select
             value={i18n.language}
             onChange={(e) => i18n.changeLanguage(e.target.value)}
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               opacity: 0,
               cursor: 'pointer',
               zIndex: 1
             }}
             aria-label={t('header.selectLang')}
           >
             <option value="en">EN</option>
             <option value="zh-CN">简</option>
             <option value="zh-TW">繁</option>
           </select>
           <span style={{ fontSize: '12px', fontWeight: 700 }}>
             {i18n.language.includes('en') ? 'EN' : 
              (i18n.language.includes('TW') ? '繁' : '简')}
           </span>
        </div>

        <button
          className="header-mobile__icon header-mobile__icon--right"
          onClick={onOpenFaq}
          aria-label={t('header.viewFaq')}
          title={t('common.faq')}
        >
          ?
        </button>


        <div className="header-mobile__title" aria-label={t('header.title')}>
          {t('header.title')}
        </div>

        <div className="header-mobile__progress">
          <div className={`progress-bar-container-mobile ${showGrayExtension ? 'extended' : ''} ${isMultisigHighProgress ? 'multisig-complete' : ''}`}>
            <div
              className={`progress-bar-mobile ${completionPercentage === 100 ? 'at-hundred' : ''} ${completionPercentage === 120 ? 'singlesig-complete' : ''} ${completionPercentage === 130 ? 'multisig-130' : ''} ${completionPercentage === 150 ? 'multisig-150' : ''}`}
              style={{
                width: `${getProgressBarWidth()}%`,
                backgroundColor: adjustedProgressColor
              }}
            />
            <span className={`progress-percentage-mobile ${isMultisigHighProgress ? 'multisig-high' : ''} ${completionPercentage >= 80 ? 'on-bar' : ''}`}>
              {completionPercentage}%
            </span>
          </div>
          {showCelebration && <div className="celebration-emoji-mobile">🎉</div>}
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;
