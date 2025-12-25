import React from 'react';

interface MobileDataFlowProps {
  isActive: boolean;
  label?: string;
  coloredLabels?: Array<{ color: string; label: string }>;
  flowType?: 'signer-wallet' | 'wallet-node';
}

// 多签槽位颜色
const SLOT_COLORS = [
  { bg: '#86efac', text: '#166534' }, // 绿色
  { bg: '#93c5fd', text: '#1e40af' }, // 蓝色
  { bg: '#c4b5fd', text: '#5b21b6' }, // 紫色
  { bg: '#f9a8d4', text: '#9d174d' }, // 粉色
  { bg: '#fde047', text: '#854d0e' }, // 黄色
];

const MobileDataFlow: React.FC<MobileDataFlowProps> = ({
  isActive,
  label,
  coloredLabels,
  flowType = 'signer-wallet',
}) => {
  const isSignerToWallet = flowType === 'signer-wallet';
  
  return (
    <div className={`mobile-data-flow-vertical ${isActive ? 'active' : ''}`}>
      {/* 左侧箭头 - 向下流动 */}
      <div className="mobile-arrow-column left">
        <span className="mobile-arrow-label top">
          {isSignerToWallet ? '签名和公钥' : '地址；已签名交易'}
        </span>
        <div className="mobile-arrow-line">
          <div className="mobile-arrow-line-static"></div>
          <span className="mobile-arrow-head down">▼</span>
        </div>
      </div>

      {/* 中间传输方式标签 */}
      <div className="mobile-transfer-center">
        {!isActive && (
          <div className="mobile-transfer-hint">
            {isSignerToWallet ? '选择签名器和钱包' : '选择钱包和节点'}
          </div>
        )}
        
        {isActive && label && (
          <div className="mobile-transfer-tags">
            <span className="mobile-transfer-tag">{label}</span>
          </div>
        )}
        
        {isActive && coloredLabels && coloredLabels.length > 0 && (
          <div className="mobile-transfer-tags">
            {coloredLabels.map((item, index) => (
              <span
                key={index}
                className="mobile-transfer-tag"
                style={{ 
                  backgroundColor: SLOT_COLORS[index]?.bg || item.color,
                  color: SLOT_COLORS[index]?.text || '#333'
                }}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 右侧箭头 - 向上流动 */}
      <div className="mobile-arrow-column right">
        <div className="mobile-arrow-line">
          <span className="mobile-arrow-head up">▲</span>
          <div className="mobile-arrow-line-static"></div>
        </div>
        <span className="mobile-arrow-label bottom">
          {isSignerToWallet ? '待签名交易' : '余额信息'}
        </span>
      </div>
    </div>
  );
};

export default MobileDataFlow;
