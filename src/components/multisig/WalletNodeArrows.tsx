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
      {/* 数据流箭头 - 文字在上方 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-block">
          <span className="arrow-label-top">地址；已签名交易</span>
          <div className="arrow-row">
            <div className="arrow-line-static"></div>
            <span className="arrow-head">▶</span>
          </div>
        </div>
        <div className="transfer-arrow-block reverse">
          <span className="arrow-label-top">余额信息</span>
          <div className="arrow-row">
            <span className="arrow-head">◀</span>
            <div className="arrow-line-static"></div>
          </div>
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
