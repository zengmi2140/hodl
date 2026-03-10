import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustodyData, UserPreference, ComponentState } from '../../types';
import OptimizedImage from './OptimizedImage';

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
  onToggleDeviceType: () => void;
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
  onToggleDeviceType,
}) => {
  const { t } = useTranslation();

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

  // 根据选中的钱包动态决定设备图标
  // 如果已选择钱包且钱包只支持一个平台，显示该平台的图标
  // 否则显示用户偏好中的设备类型图标
  const getDeviceIcon = () => {
    if (selectedWallet && custodyData) {
      const wallet = custodyData.softwareWallets.find(w => w.id === selectedWallet);
      if (wallet && wallet.supportedPlatforms.length === 1) {
        // 钱包只支持一个平台，显示该平台的图标
        return wallet.supportedPlatforms[0].toLowerCase() === 'mobile' ? '📱' : '💻';
      }
    }
    // 否则使用用户偏好中的设备类型
    return userPreference?.deviceType === 'mobile' ? '📱' : '💻';
  };

  const deviceIcon = getDeviceIcon();

  const isSinglesigMode = !!getComponentState;

  const filteredWallets = custodyData.softwareWallets.filter(wallet => {
    if (isSinglesigMode && wallet.multisigOnly) return false;
    return wallet.supportedPlatforms.map(p => p.toLowerCase()).includes(userPreference?.deviceType || 'desktop');
  });

  return (
    <div className="column">
      <div className="column-title" style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', justifyContent: 'center' }}>
        <div style={{ flex: 1 }}></div>
        <span>{t('columns.wallet')}</span>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div className="device-segmented">
            <button
              className={`device-segment ${userPreference?.deviceType === 'desktop' ? 'active' : ''}`}
              onClick={() => userPreference?.deviceType !== 'desktop' && onToggleDeviceType()}
              title={t('common.desktop')}
            >
              💻
            </button>
            <button
              className={`device-segment ${userPreference?.deviceType === 'mobile' ? 'active' : ''}`}
              onClick={() => userPreference?.deviceType !== 'mobile' && onToggleDeviceType()}
              title={t('common.mobile')}
            >
              📱
            </button>
          </div>
        </div>
      </div>
      {filteredWallets.map(wallet => {
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
            <OptimizedImage
              src={wallet.logo}
              alt={wallet.name}
              className="option-logo"
              loading="lazy"
            />
            <span className="option-name">{wallet.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WalletColumn;