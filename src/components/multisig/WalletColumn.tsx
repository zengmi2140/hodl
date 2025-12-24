import React, { useState } from 'react';
import { CustodyData } from '../../types';
import FeatureTooltip from './FeatureTooltip';

interface WalletColumnProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  onWalletSelect: (walletId: string | null) => void;
}

const WalletColumn: React.FC<WalletColumnProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  onWalletSelect,
}) => {
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

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
        
        return (
          <div
            key={wallet.id}
            className={`multisig-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleWalletClick(wallet.id)}
            style={{ position: 'relative' }}
          >
            <img
              src={wallet.logo}
              alt={wallet.name}
              className="multisig-item-logo"
            />
            <span className="multisig-item-name">{wallet.name}</span>
            <div
              className="multisig-item-info"
              onMouseEnter={() => setHoveredWallet(wallet.id)}
              onMouseLeave={() => setHoveredWallet(null)}
            >
              i
            </div>
            {hoveredWallet === wallet.id && (
              <FeatureTooltip features={wallet.features} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WalletColumn;
