import React from 'react';

interface HeaderMobileProps {
  completionPercentage: number;
  maxProgress?: number;
  onResetPreference: () => void;
  onOpenFaq: () => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  completionPercentage,
  maxProgress = 120,
  onResetPreference,
  onOpenFaq
}) => {
  const getProgressColor = (percentage: number): string => {
    if (percentage === 0) return '#fbbf24';
    if (percentage <= 60) return '#ffcc80';
    if (percentage <= 100) return '#ffb74d';
    if (percentage <= 120) return '#F7931A';
    if (percentage <= 130) return '#F7931A';
    if (percentage <= 150) return '#ff6b00';
    return '#fbbf24';
  };

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
        <button
          className="header-mobile__icon header-mobile__icon--left"
          onClick={onResetPreference}
          aria-label="重置偏好"
          title="重置"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        <button
          className="header-mobile__icon header-mobile__icon--right"
          onClick={onOpenFaq}
          aria-label="查看 FAQ"
          title="FAQ"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>

        <div className="header-mobile__title" aria-label="比特币自主保管模拟器">
          比特币自主保管模拟器
        </div>

        <div className="header-mobile__progress">
          <div className={`progress-bar-container-mobile ${showGrayExtension ? 'extended' : ''} ${isMultisigHighProgress ? 'multisig-complete' : ''}`}>
            <div
              className={`progress-bar-mobile ${completionPercentage === 100 ? 'at-hundred' : ''} ${completionPercentage === 120 ? 'singlesig-complete' : ''} ${completionPercentage === 130 ? 'multisig-130' : ''} ${completionPercentage === 150 ? 'multisig-150' : ''}`}
              style={{
                width: `${getProgressBarWidth()}%`,
                backgroundColor: getProgressColor(completionPercentage)
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
