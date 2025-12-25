import React from 'react';

interface HeaderProps {
  completionPercentage: number;
  onResetPreference: () => void;
  onOpenFaq: () => void;
  layoutLeftEdge?: number;
  layoutRightEdge?: number;
}

const Header: React.FC<HeaderProps> = ({ completionPercentage, onResetPreference, onOpenFaq, layoutLeftEdge, layoutRightEdge }) => {
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
      {/* 右上角统一按钮组 */}
      <div className="header-actions">
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
          <div className={`progress-bar-container ${showGrayExtension ? 'extended' : ''}`}>
            <div 
              className={`progress-bar ${completionPercentage === 100 ? 'at-hundred' : ''}`}
              style={{
                width: `${completionPercentage >= 100 && completionPercentage < 120 ? 83.33 : completionPercentage === 120 ? 100 : completionPercentage}%`,
                backgroundColor: getProgressColor(completionPercentage)
              }}
            />
          </div>
          <div className="progress-info">
            <span className="progress-percentage">{completionPercentage}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;