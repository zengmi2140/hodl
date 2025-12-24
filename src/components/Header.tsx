import React, { useState } from 'react';

interface HeaderProps {
  completionPercentage: number;
  onResetPreference: () => void;
  onOpenFaq: () => void;
  layoutLeftEdge?: number;
  layoutRightEdge?: number;
}

const Header: React.FC<HeaderProps> = ({ completionPercentage, onResetPreference, onOpenFaq, layoutLeftEdge, layoutRightEdge }) => {
  const [isMultiSigTooltipVisible, setIsMultiSigTooltipVisible] = useState(false);
  
  // 进度条动态宽度计算
  const GAP_FROM_BUTTONS = 24; // 进度条与按钮之间的间隙（像素）
  const BUTTON_WIDTH = 72; // 按钮的大致宽度（像素）
  
  const calculateProgressMaxWidth = (): number => {
    if (layoutLeftEdge === undefined || layoutRightEdge === undefined) {
      return 800; // 默认最大宽度
    }
    
    // 进度条左边界 = 重置按钮右边界 + 间隙
    const progressLeftBound = layoutLeftEdge + BUTTON_WIDTH + GAP_FROM_BUTTONS;
    // 进度条右边界 = FAQ 按钮左边界 - 间隙  
    const progressRightBound = layoutRightEdge - BUTTON_WIDTH - GAP_FROM_BUTTONS;
    
    // 可用宽度
    const availableWidth = progressRightBound - progressLeftBound;
    
    // 返回可用宽度，最小 200px，最大 800px
    return Math.min(Math.max(availableWidth, 200), 800);
  };

  const progressMaxWidth = calculateProgressMaxWidth();
  
  const getProgressColor = (percentage: number): string => {
    if (percentage === 0) return '#fbbf24';   // 黄色 - 空状态
    if (percentage === 50) return '#ffcc80';  // 更浅橙色 - 仅选择硬件签名器
    if (percentage === 60) return '#ffb74d';  // 浅橙色 - "不使用签名器" + 软件钱包
    if (percentage === 80) return '#ffb74d';  // 浅橙色 - "不使用签名器" + 软件钱包 + 节点
    if (percentage === 100) return '#ffb74d'; // 浅橙色 - 硬件签名器 + 软件钱包
    if (percentage === 120) return '#F7931A'; // 比特币橙色 - 完整硬件配置
    return '#fbbf24'; // 默认黄色
  };

  // 判断是否显示庆祝emoji
  const showCelebration = completionPercentage === 120;
  // 判断是否显示灰色延伸区域
  const showGrayExtension = completionPercentage === 100;

  return (
    <header className="header">
      {/* 左侧重置按钮 - 直接在 header 层级，相对于视口定位 */}
      <div 
        className="header-actions-left"
        style={layoutLeftEdge !== undefined ? { left: `${layoutLeftEdge}px` } : undefined}
      >
        <button 
          className="reset-button"
          onClick={onResetPreference}
          title="重置偏好"
        >
          重置
        </button>
      </div>

      {/* 右侧 FAQ 按钮 - 直接在 header 层级，相对于视口定位 */}
      <div 
        className="header-actions"
        style={layoutRightEdge !== undefined ? { right: `calc(100% - ${layoutRightEdge}px)` } : undefined}
      >
        <button 
          className="faq-button"
          onClick={onOpenFaq}
          aria-label="查看 FAQ"
        >
          FAQ
        </button>
      </div>

      <div className="header-content">
        <div
          className="site-title"
          aria-label="比特币自主保管模拟器"
          role="heading"
          aria-level={1}
        >
          比特币自主保管模拟器
        </div>
        {/* 中央进度条区域 */}
        <div className="progress-section" style={{ maxWidth: `${progressMaxWidth}px` }}>
          <div className={`progress-bar-container ${showGrayExtension ? 'extended' : ''}`}>
            <div 
              className={`progress-bar ${completionPercentage === 100 ? 'at-hundred' : ''}`}
              style={{
                width: `${completionPercentage >= 100 && completionPercentage < 120 ? 83.33 : completionPercentage === 120 ? 100 : completionPercentage}%`,
                backgroundColor: getProgressColor(completionPercentage)
              }}
            />
            <div className="progress-percentage">
              {completionPercentage}%
            </div>
          </div>
          {/* 庆祝emoji */}
          {showCelebration && (
            <div className="celebration-emoji">
              🎉
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;