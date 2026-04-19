import React from "react";
import { useTranslation } from 'react-i18next';

interface WalletNodeArrowsProps {
  hasWallet: boolean;
  hasNode: boolean;
}

const WalletNodeArrows: React.FC<WalletNodeArrowsProps> = ({ hasWallet, hasNode }) => {
  const { t } = useTranslation();

  return (
    <div className="transfer-method-display">
      {/* 数据流箭头 */}
      <div className="transfer-arrows">
        <div className="transfer-arrow-block">
          <span className="arrow-label-top">{t('arrows.address_signed')}</span>
          <div className="arrow-row">
            <div className="arrow-line-static"></div>
            <span className="arrow-head">▶</span>
          </div>
        </div>
        <div className="transfer-arrow-block reverse">
          <span className="arrow-label-top">{t('arrows.balance')}</span>
          <div className="arrow-row">
            <span className="arrow-head">◀</span>
            <div className="arrow-line-static"></div>
          </div>
        </div>
      </div>

      {/* 连接状态 */}
      <div className="transfer-methods-container">
        <div className="transfer-method-hint">
          {!hasWallet && !hasNode && t('arrows.select_hint_wallet_node')}
          {hasWallet && !hasNode && t('arrows.please_select_node')}
          {!hasWallet && hasNode && t('arrows.please_select_wallet')}
          {hasWallet && hasNode && (
            <span className="wallet-node-connected">
              ✓ {t('arrows.connected')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletNodeArrows;
