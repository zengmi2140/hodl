import React from 'react';

interface MobileDataFlowProps {
  isActive: boolean;
  label?: string;
  coloredLabels?: Array<{ color: string; label: string }>;
  flowType?: 'signer-wallet' | 'wallet-node';
}

// 传输方式图标映射
const getMethodIcon = (method: string): string => {
  const methodLower = method.toLowerCase();
  if (methodLower.includes('qr') || methodLower.includes('二维码')) return '📷';
  if (methodLower.includes('usb')) return '🔌';
  if (methodLower.includes('sd') || methodLower.includes('microsd')) return '💾';
  if (methodLower.includes('bluetooth') || methodLower.includes('蓝牙')) return '📶';
  if (methodLower.includes('nfc')) return '📡';
  return '🔗';
};

const MobileDataFlow: React.FC<MobileDataFlowProps> = ({
  isActive,
  label,
  coloredLabels,
  flowType = 'signer-wallet',
}) => {
  const isSignerToWallet = flowType === 'signer-wallet';
  
  return (
    <div className={`mobile-data-flow-enhanced ${isActive ? 'active' : ''}`}>
      {/* 主流程线容器 */}
      <div className="data-flow-track">
        {/* 向下流动 - 签名/公钥 */}
        <div className={`data-flow-segment outgoing ${isActive ? 'active' : ''}`}>
          <div className="flow-line-container">
            <div className="flow-line">
              {isActive && <div className="flow-pulse down" />}
            </div>
          </div>
          <div className="flow-info">
            <span className="flow-direction-icon">↓</span>
            <span className="flow-data-label">
              {isSignerToWallet ? '🔑 签名/公钥' : '📊 余额数据'}
            </span>
          </div>
        </div>

        {/* 传输方式标签区域 */}
        <div className="transfer-methods-container">
          {!isActive && (
            <div className="transfer-placeholder">
              {isSignerToWallet ? '选择签名器和钱包' : '选择钱包和节点'}
            </div>
          )}
          
          {isActive && label && (
            <div className="transfer-tag-single">
              <span className="tag-icon">{getMethodIcon(label)}</span>
              <span className="tag-text">{label}</span>
            </div>
          )}
          
          {isActive && coloredLabels && coloredLabels.length > 0 && (
            <div className="transfer-tags-multi">
              {coloredLabels.map((item, index) => (
                <div
                  key={index}
                  className="transfer-tag-colored"
                  style={{ 
                    borderLeftColor: item.color,
                    backgroundColor: `${item.color}15`
                  }}
                >
                  <span className="tag-slot-number">
                    {['①', '②', '③', '④', '⑤'][index]}
                  </span>
                  <span className="tag-icon">{getMethodIcon(item.label)}</span>
                  <span className="tag-text">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 向上流动 - 待签名交易 */}
        <div className={`data-flow-segment incoming ${isActive ? 'active' : ''}`}>
          <div className="flow-info reverse">
            <span className="flow-direction-icon">↑</span>
            <span className="flow-data-label">
              {isSignerToWallet ? '📝 待签名交易' : '🔄 交易广播'}
            </span>
          </div>
          <div className="flow-line-container">
            <div className="flow-line">
              {isActive && <div className="flow-pulse up" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDataFlow;
