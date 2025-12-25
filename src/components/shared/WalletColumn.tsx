import React from 'react';
import { CustodyData, UserPreference, ComponentState } from '../../types';

interface WalletColumnProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  onWalletSelect: (walletId: string | null) => void;
  hasSelectedSigners: boolean;
  userPreference?: UserPreference | null;
  // 单签模式使用
  getComponentState?: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick?: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
}

const WalletColumn: React.FC<WalletColumnProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  onWalletSelect,
  hasSelectedSigners,
  userPreference,
  getComponentState,
  onComponentClick,
}) => {
  const handleWalletClick = (walletId: string) => {
    // 如果提供了单签模式的 onComponentClick，使用它
    if (onComponentClick) {
      onComponentClick(walletId, 'wallet');
      return;
    }
    // 否则使用多签模式的逻辑
    if (selectedWallet === walletId) {
      onWalletSelect(null);
    } else if (compatibleWallets.includes(walletId)) {
      onWalletSelect(walletId);
    }
  };

  const deviceIcon = userPreference?.deviceType === 'mobile' ? '📱' : '💻';

  return (
    <div className="column">
      <div className="column-title">
        软件钱包 {deviceIcon}
      </div>
      {custodyData.softwareWallets.map(wallet => {
        // 如果提供了 getComponentState，使用单签模式的状态逻辑
        let isCompatible: boolean;
        let isBreathing: boolean;
        
        if (getComponentState) {
          const state = getComponentState(wallet.id, 'wallet');
          isCompatible = state !== 'inactive';
          isBreathing = state === 'breathing';
        } else {
          isCompatible = compatibleWallets.includes(wallet.id);
          isBreathing = hasSelectedSigners && isCompatible && selectedWallet !== wallet.id;
        }
        
        const isSelected = selectedWallet === wallet.id;
        
        return (
          <div
            key={wallet.id}
            className={`option-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''} ${isBreathing ? 'breathing' : ''}`}
            onClick={() => handleWalletClick(wallet.id)}
          >
            <img
              src={wallet.logo}
              alt={wallet.name}
              className="option-logo"
            />
            <span className="option-name">{wallet.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WalletColumn;