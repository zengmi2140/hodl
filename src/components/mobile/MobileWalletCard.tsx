import React, { useState, useRef } from 'react';
import { CustodyData, ComponentState, Feature, UserPreference } from '../../types';
import MobileFeatureSheet from './MobileFeatureSheet';

interface MobileWalletCardProps {
  selectedWallet: string | null;
  custodyData: CustodyData;
  compatibleWallets: string[];
  userPreference: UserPreference | null;
  // For single-sig mode
  getComponentState?: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick?: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  // For multi-sig mode
  onWalletSelect?: (walletId: string | null) => void;
}

const MobileWalletCard: React.FC<MobileWalletCardProps> = ({
  selectedWallet,
  custodyData,
  compatibleWallets,
  userPreference,
  getComponentState,
  onComponentClick,
  onWalletSelect,
}) => {
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
      if (state !== 'inactive') {
        const wasSelected = selectedWallet === walletId;
        onComponentClick(walletId, 'wallet');
        // Only scroll if selecting (not deselecting)
        if (!wasSelected) {
          scrollToEnd();
        }
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

  // Get device icon
  const deviceIcon = userPreference?.deviceType === 'mobile' ? '📱' : '💻';

  return (
    <>
      <div className="mobile-card">
        <div className="mobile-card-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="mobile-card-title">
            <span className="mobile-card-title-icon">{deviceIcon}</span>
            软件钱包
            {selectedWalletData && (
              <span className="mobile-card-selected-badge">{selectedWalletData.name}</span>
            )}
          </div>
          <span className={`mobile-card-toggle ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
        <div className={`mobile-card-body ${isExpanded ? 'expanded' : ''}`}>
          <div className="mobile-card-content">
            {custodyData.softwareWallets.map(wallet => {
              const state = getWalletState(wallet.id);
              const isSelected = selectedWallet === wallet.id;

              return (
                <div
                  key={wallet.id}
                  className={`mobile-option-item ${state} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleWalletClick(wallet.id)}
                >
                  <img src={wallet.logo} alt={wallet.name} className="mobile-option-logo" loading="lazy" decoding="async" />
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
        featureGroups={[{ title: '钱包特性', features: selectedFeatures }]}
      />
    </>
  );
};

export default MobileWalletCard;
