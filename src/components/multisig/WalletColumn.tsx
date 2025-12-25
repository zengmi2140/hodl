import React from 'react';
import { CustodyData, UserPreference } from '../../types';

interface WalletColumnProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  onWalletSelect: (walletId: string | null) => void;
  hasSelectedSigners: boolean;
  userPreference?: UserPreference | null;
}

const WalletColumn: React.FC<WalletColumnProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  onWalletSelect,
  hasSelectedSigners,
  userPreference,
}) => {
  const handleWalletClick = (walletId: string) => {
    if (selectedWallet === walletId) {
      onWalletSelect(null);
    } else if (compatibleWallets.includes(walletId)) {
      onWalletSelect(walletId);
    }
  };

  const deviceIcon = userPreference?.deviceType === 'mobile' ? '📱' : '💻';

  return (
    <div className="multisig-column">
      <div className="multisig-column-title">
        软件钱包 {deviceIcon}
      </div>
      {custodyData.softwareWallets.map(wallet => {
        const isCompatible = compatibleWallets.includes(wallet.id);
        const isSelected = selectedWallet === wallet.id;
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
