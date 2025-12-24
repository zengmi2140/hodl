import React from 'react';
import './MultisigHeader.css';

interface MultisigHeaderProps {
  completionPercentage: number;
  onNavigateBack: () => void;
}

const MultisigHeader: React.FC<MultisigHeaderProps> = ({
  completionPercentage,
  onNavigateBack,
}) => {
  const getProgressColor = (percentage: number): string => {
    if (percentage < 30) return '#fbbf24';  // 黄色
    if (percentage < 60) return '#ffcc80';  // 浅橙色
    if (percentage < 90) return '#ffb74d';  // 橙色
    if (percentage < 100) return '#ff9800'; // 深橙色
    return '#F7931A';                        // 比特币橙色
  };

  return (
    <header className="multisig-header">
      <div className="multisig-header-left">
        <button 
          className="multisig-nav-button"
          onClick={onNavigateBack}
        >
          ← 单签模式
        </button>
      </div>

      <div className="multisig-header-center">
        <div className="multisig-title">
          多签模式
        </div>
        <div className="multisig-progress-container">
          <div 
            className="multisig-progress-bar"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: getProgressColor(completionPercentage),
            }}
          />
          <div className="multisig-progress-text">
            {completionPercentage}%
          </div>
        </div>
      </div>

      <div className="multisig-header-right">
        {/* 预留右侧区域 */}
      </div>
    </header>
  );
};

export default MultisigHeader;
