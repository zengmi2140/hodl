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
      {/* 数据流箭头 - 虚线动画 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-line flow-right">
          <span className="arrow-label-group">
            <span>地址</span>
            <span>已签名交易</span>
          </span>
          <div className="arrow-line dashed-flow-right"></div>
          <span className="arrow-head">→</span>
        </div>
        <div className="transfer-arrow-line flow-left">
          <span className="arrow-head">←</span>
          <div className="arrow-line dashed-flow-left"></div>
          <span className="arrow-label">余额信息</span>
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
