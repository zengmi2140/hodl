import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustodyData, ComponentState, Feature, UserPreference } from '../../types';
import MobileFeatureSheet from './MobileFeatureSheet';
import OptimizedImage from '../shared/OptimizedImage';

interface MobileWalletCardProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  userPreference: UserPreference;
  // For single-sig mode
  getComponentState?: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick?: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  // For multi-sig mode
  onWalletSelect?: (walletId: string | null) => void;
  onToggleDeviceType: () => void;
}

const MobileWalletCard: React.FC<MobileWalletCardProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  userPreference,
  getComponentState,
  onComponentClick,
  onWalletSelect,
  onToggleDeviceType,
}) => {
  const { t } = useTranslation();
  const cardEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [featureSheetOpen, setFeatureSheetOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

  const handleInfoClick = (e: React.MouseEvent, features: Feature[]) => {
    e.stopPropagation();
    setSelectedFeatures(features);
    setFeatureSheetOpen(true);
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      cardEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleWalletClick = (walletId: string) => {
    // Single-sig mode
    if (getComponentState && onComponentClick) {
      const state = getComponentState(walletId, 'wallet');
      const wasSelected = selectedWallet === walletId;
      // 允许点击所有状态的钱包，包括 inactive 状态
      // handleComponentClick 会处理 inactive 状态的钱包（重置并选择，同时更新设备类型）
      onComponentClick(walletId, 'wallet');
      // Only scroll if selecting (not deselecting)
      if (!wasSelected) {
        scrollToEnd();
      }
    }
    // Multi-sig mode
    else if (onWalletSelect) {
      if (selectedWallet === walletId) {
        onWalletSelect(null);
        // Don't scroll on deselect
      } else if (compatibleWallets.includes(walletId)) {
        onWalletSelect(walletId);
        scrollToEnd();
      }
    }
  };

  const getWalletState = (walletId: string): ComponentState => {
    if (getComponentState) {
      return getComponentState(walletId, 'wallet');
    }
    // Multi-sig mode
    if (selectedWallet === walletId) return 'active';
    if (!compatibleWallets.includes(walletId)) return 'inactive';
    return 'breathing';
  };

  const selectedWalletData = selectedWallet
    ? custodyData.softwareWallets.find(w => w.id === selectedWallet)
    : null;

  // 根据选中的钱包动态决定设备图标
  // 如果已选择钱包且钱包只支持一个平台,显示该平台的图标
  // 否则显示用户偏好中的设备类型图标
  const getDeviceIcon = () => {
    if (selectedWallet) {
      const wallet = custodyData.softwareWallets.find(w => w.id === selectedWallet);
      if (wallet && wallet.supportedPlatforms.length === 1) {
        // 钱包只支持一个平台，显示该平台的图标
        return wallet.supportedPlatforms[0].toLowerCase() === 'mobile' ? '📱' : '💻';
      }
    }
    // 否则使用用户偏好中的设备类型
    return userPreference.deviceType === 'mobile' ? '📱' : '💻';
  };

  const deviceIcon = getDeviceIcon();

  const isSinglesigMode = !!getComponentState;

  const filteredWallets = custodyData.softwareWallets.filter(wallet => {
    if (isSinglesigMode && wallet.multisigOnly) return false;
    return wallet.supportedPlatforms.map(p => p.toLowerCase()).includes(userPreference.deviceType);
  });

  return (
    <>
      <div className="mobile-card">
        <div className="mobile-card-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="mobile-card-title">
            <span className="mobile-card-title-icon">{deviceIcon}</span>
            {t('columns.wallet')}
            {selectedWalletData && (
              <span className="mobile-card-selected-badge">{selectedWalletData.name}</span>
            )}
            <div className="mobile-device-segmented" onClick={(e) => e.stopPropagation()}>
              <button
                className={`mobile-device-segment ${userPreference.deviceType === 'desktop' ? 'active' : ''}`}
                onClick={() => userPreference.deviceType !== 'desktop' && onToggleDeviceType()}
              >
                💻
              </button>
              <button
                className={`mobile-device-segment ${userPreference.deviceType === 'mobile' ? 'active' : ''}`}
                onClick={() => userPreference.deviceType !== 'mobile' && onToggleDeviceType()}
              >
                📱
              </button>
            </div>
          </div>
          <span className={`mobile-card-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
        <div className={`mobile-card-body ${isExpanded ? 'expanded' : ''}`}>
          <div className="mobile-card-content">
            {filteredWallets.map(wallet => {
              const state = getWalletState(wallet.id);
              const isSelected = selectedWallet === wallet.id;

              return (
                <div
                  key={wallet.id}
                  className={`mobile-option-item ${state} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleWalletClick(wallet.id)}
                >
                  <OptimizedImage src={wallet.logo} alt={wallet.name} className="mobile-option-logo" loading="lazy" />
                  <span className="mobile-option-name">{wallet.name}</span>
                  {isSelected && <span className="mobile-option-check">✓</span>}
                  {wallet.features.length > 0 && (
                    <span
                      className="mobile-option-info"
                      onClick={(e) => handleInfoClick(e, wallet.features)}
                    >
                      i
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={cardEndRef} style={{ scrollMarginTop: '110px' }} />
          </div>
        </div>
      </div>

      <MobileFeatureSheet
        isOpen={featureSheetOpen}
        onClose={() => setFeatureSheetOpen(false)}
        featureGroups={[{ title: t('features.wallet'), features: selectedFeatures }]}
      />
    </>
  );
};

export default MobileWalletCard;
