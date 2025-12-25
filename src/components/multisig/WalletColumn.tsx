import React from 'react';
import { CustodyData } from '../../types';

interface WalletColumnProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  onWalletSelect: (walletId: string | null) => void;
  hasSelectedSigners: boolean;
}

const WalletColumn: React.FC<WalletColumnProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  onWalletSelect,
  hasSelectedSigners,
}) => {
  const handleWalletClick = (walletId: string) => {
    if (selectedWallet === walletId) {
      onWalletSelect(null);
    } else if (compatibleWallets.includes(walletId)) {
      onWalletSelect(walletId);
    }
  };

  return (
    <div className="multisig-column">
      <div className="multisig-column-title">软件钱包</div>
      {custodyData.softwareWallets.map(wallet => {
        const isCompatible = compatibleWallets.includes(wallet.id);
        const isSelected = selectedWallet === wallet.id;
        // 如果有选择签名器且钱包兼容，显示呼吸动画
        const isBreathing = hasSelectedSigners && isCompatible && !isSelected;
        
        return (
          <div
            key={wallet.id}
            className={`multisig-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''} ${isBreathing ? 'breathing' : ''}`}
            onClick={() => handleWalletClick(wallet.id)}
          >
            <img
              src={wallet.logo}
              alt={wallet.name}
              className="multisig-item-logo"
            />
            <span className="multisig-item-name">{wallet.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WalletColumn;
