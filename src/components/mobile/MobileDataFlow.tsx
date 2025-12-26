import React from 'react';
import { SLOT_COLORS } from '../../App';

interface MobileDataFlowProps {
  isActive: boolean;
  label?: string;
  coloredLabels?: Array<{ slotIndex: number; methods: string[] }>;
  flowType?: 'signer-wallet' | 'wallet-node';
}

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
          {isSignerToWallet ? '公钥和签名' : '地址；已签名交易'}
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
          <div className="mobile-transfer-tags-multisig">
            {coloredLabels.map(({ slotIndex, methods }) => {
              const color = SLOT_COLORS[slotIndex];
              return methods.map((method, idx) => (
                <span
                  key={`${slotIndex}-${idx}`}
                  className="mobile-transfer-tag colored"
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.border,
                  }}
                >
                  {method}
                </span>
              ));
            })}
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
