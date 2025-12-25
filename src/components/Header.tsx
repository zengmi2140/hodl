import React from 'react';

interface HeaderProps {
  completionPercentage: number;
  maxProgress?: number;
  onResetPreference: () => void;
  onOpenFaq: () => void;
  layoutLeftEdge?: number;
  layoutRightEdge?: number;
}

const Header: React.FC<HeaderProps> = ({ completionPercentage, maxProgress = 120, onResetPreference, onOpenFaq, layoutLeftEdge, layoutRightEdge }) => {
  // 进度条动态宽度计算（保持居中）
  const GAP_FROM_BUTTONS = 24; // 进度条与按钮之间的间隙（像素）
  const BUTTON_WIDTH = 72; // 按钮的大致宽度（像素）
  
  const calculateProgressMaxWidth = (): number | null => {
    if (layoutLeftEdge === undefined || layoutRightEdge === undefined) {
      return null; // 使用默认样式
    }
    
    // 页面中心点
    const pageCenter = window.innerWidth / 2;
    
    // 左侧按钮右边界
    const leftButtonRight = layoutLeftEdge + BUTTON_WIDTH + GAP_FROM_BUTTONS;
    // 右侧按钮左边界
    const rightButtonLeft = layoutRightEdge - BUTTON_WIDTH - GAP_FROM_BUTTONS;
    
    // 从页面中心到左侧的可用距离
    const leftHalfSpace = pageCenter - leftButtonRight;
    // 从页面中心到右侧的可用距离
    const rightHalfSpace = rightButtonLeft - pageCenter;
    
    // 取较小值作为半宽度，保证两侧都不超出
    const halfWidth = Math.min(leftHalfSpace, rightHalfSpace);
    
    // 进度条总宽度，最小200px，最大800px
    return Math.min(Math.max(halfWidth * 2, 200), 800);
  };

  const progressMaxWidth = calculateProgressMaxWidth();
  
  const getProgressColor = (percentage: number): string => {
    if (percentage === 0) return '#fbbf24';   // 黄色 - 空状态
    if (percentage <= 60) return '#ffcc80';   // 更浅橙色 - 部分配置
    if (percentage <= 100) return '#ffb74d';  // 浅橙色 - 基础完成
    if (percentage <= 120) return '#F7931A';  // 比特币橙色 - 单签完整配置
    if (percentage <= 130) return '#F7931A';  // 比特币橙色 - 2-of-3完整配置
    if (percentage <= 150) return '#ff6b00';  // 深橙色 - 3-of-5完整配置
    return '#fbbf24'; // 默认黄色
  };

  // 计算进度条显示宽度（按最大进度值比例缩放）
  const getProgressBarWidth = (): number => {
    // 按比例缩放：实际进度 / 最大进度 * 100
    // 例如：2-of-3模式下 110% / 130% = 84.6%
    return Math.min((completionPercentage / maxProgress) * 100, 100);
  };

  // 判断是否显示庆祝emoji
  const showCelebration = completionPercentage >= 120;
  // 判断是否显示灰色延伸区域（仅单签100%时）
  const showGrayExtension = completionPercentage === 100;
  // 判断是否为多签高进度
  const isMultisigHighProgress = completionPercentage === 130 || completionPercentage === 150;

  // 计算按钮位置：使 FAQ 按钮右边与节点列右边对齐
  const getButtonsRight = (): string | undefined => {
    if (layoutRightEdge === undefined) return undefined;
    // 页面右边距离 layoutRightEdge 的距离
    return `${window.innerWidth - layoutRightEdge}px`;
  };

  return (
    <header className="header">
      {/* 右上角统一按钮组 */}
      <div 
        className="header-actions"
        style={{ right: getButtonsRight() }}
      >
        <button 
          className="header-btn"
          onClick={onResetPreference}
          title="重置偏好"
        >
          重置
        </button>
        <button 
          className="header-btn"
          onClick={onOpenFaq}
          aria-label="查看 FAQ"
        >
          FAQ
        </button>
      </div>

      <div className="header-content">
        <h1 className="site-title">
          <span className="bitcoin-logo">₿</span>
          比特币自主保管模拟器
        </h1>
        {/* 中央进度条区域 */}
        <div 
          className="progress-section" 
          style={progressMaxWidth ? { maxWidth: `${progressMaxWidth}px` } : undefined}
        >
          <div className={`progress-bar-container ${showGrayExtension ? 'extended' : ''} ${isMultisigHighProgress ? 'multisig-complete' : ''}`}>
            <div 
              className={`progress-bar ${completionPercentage === 100 ? 'at-hundred' : ''} ${completionPercentage === 120 ? 'singlesig-complete' : ''} ${completionPercentage === 130 ? 'multisig-130' : ''} ${completionPercentage === 150 ? 'multisig-150' : ''}`}
              style={{
                width: `${getProgressBarWidth()}%`,
                backgroundColor: getProgressColor(completionPercentage)
              }}
            />
          </div>
          <div className="progress-info">
            <span className={`progress-percentage ${isMultisigHighProgress ? 'multisig-high' : ''}`}>
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;