import React from 'react';

interface WalletNodeArrowsProps {
  hasWallet: boolean;
  hasNode: boolean;
}

const WalletNodeArrows: React.FC<WalletNodeArrowsProps> = ({
  hasWallet,
  hasNode,
}) => {
  return (
    <div className="transfer-method-display">
      {/* 数据流箭头 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-line">
          <span className="arrow-icon">←</span>
          <span className="arrow-label">区块</span>
        </div>
        <div className="transfer-arrow-line">
          <span className="arrow-label">广播</span>
          <span className="arrow-icon">→</span>
        </div>
      </div>

      {/* 连接状态 */}
      <div className="transfer-methods-container">
        <div className="transfer-method-hint">
          {!hasWallet && !hasNode && '选择钱包和节点'}
          {hasWallet && !hasNode && '请选择节点'}
          {!hasWallet && hasNode && '请选择钱包'}
          {hasWallet && hasNode && (
            <span className="wallet-node-connected">
              ✓ 已连接
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletNodeArrows;
