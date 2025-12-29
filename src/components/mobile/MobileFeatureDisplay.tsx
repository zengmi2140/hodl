import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustodyData, Feature } from '../../types';
import { SignatureMode } from '../SignatureModeSelector';

interface MobileFeatureDisplayProps {
  signatureMode: SignatureMode;
  // Single-sig
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  // Multi-sig
  signerSlots: (string | null)[];
  multisigWallet: string | null;
  multisigNode: string | null;
  // Data
  custodyData: CustodyData;
}

const MobileFeatureDisplay: React.FC<MobileFeatureDisplayProps> = ({
  signatureMode,
  selectedSigners,
  selectedWallet,
  selectedNode,
  signerSlots,
  multisigWallet,
  multisigNode,
  custodyData,
}) => {
  const { t } = useTranslation();
  const getFeatureIcon = (type: Feature['type']) => {
    switch (type) {
      case 'positive':
        return '✅';
      case 'negative':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '📌';
    }
  };

  // Get selected components based on mode
  const getSelectedSignerIds = (): string[] => {
    if (signatureMode === 'single') {
      return selectedSigners.filter(id => id && id !== 'none');
    } else {
      return signerSlots.filter((id): id is string => id !== null);
    }
  };

  const getCurrentWallet = () => signatureMode === 'single' ? selectedWallet : multisigWallet;
  const getCurrentNode = () => signatureMode === 'single' ? selectedNode : multisigNode;

  const selectedSignerIds = getSelectedSignerIds();
  const currentWallet = getCurrentWallet();
  const currentNode = getCurrentNode();

  // Get component data
  const getSignerData = (id: string) => custodyData.hardwareSigners.find(s => s.id === id);
  const getWalletData = (id: string) => custodyData.softwareWallets.find(w => w.id === id);
  const getNodeData = (id: string) => custodyData.nodes.find(n => n.id === id);

  // Check if we have any selections to display
  const hasAnySelection = selectedSignerIds.length > 0 || currentWallet || currentNode;

  if (!hasAnySelection) {
    return null;
  }

  return (
    <div className="mobile-feature-display">
      <h3 className="mobile-feature-display-title">{t('features.selected_title', '已选选项特性')}</h3>

      {/* Signers Features */}
      {selectedSignerIds.map((signerId, index) => {
        const signer = getSignerData(signerId);
        if (!signer || !signer.features || signer.features.length === 0) return null;
        
        return (
          <div key={`signer-${signerId}-${index}`} className="mobile-feature-display-section">
            <div className="mobile-feature-display-header">
              <img 
                src={signer.logo} 
                alt={signer.name} 
                className="mobile-feature-display-logo"
              />
              <span className="mobile-feature-display-name">{signer.name}</span>
              <span className="mobile-feature-display-type">{t('columns.signer')}</span>
            </div>
            <div className="mobile-feature-display-list">
              {signer.features.map((feature, fIndex) => (
                <div key={fIndex} className="mobile-feature-display-item">
                  <span className="mobile-feature-display-icon">{getFeatureIcon(feature.type)}</span>
                  <span className="mobile-feature-display-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Wallet Features */}
      {currentWallet && (() => {
        const wallet = getWalletData(currentWallet);
        if (!wallet || !wallet.features || wallet.features.length === 0) return null;
        
        return (
          <div className="mobile-feature-display-section">
            <div className="mobile-feature-display-header">
              <img 
                src={wallet.logo} 
                alt={wallet.name} 
                className="mobile-feature-display-logo"
              />
              <span className="mobile-feature-display-name">{wallet.name}</span>
              <span className="mobile-feature-display-type">{t('columns.wallet')}</span>
            </div>
            <div className="mobile-feature-display-list">
              {wallet.features.map((feature, fIndex) => (
                <div key={fIndex} className="mobile-feature-display-item">
                  <span className="mobile-feature-display-icon">{getFeatureIcon(feature.type)}</span>
                  <span className="mobile-feature-display-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Node Features */}
      {currentNode && (() => {
        const node = getNodeData(currentNode);
        if (!node || !node.features || node.features.length === 0) return null;
        
        return (
          <div className="mobile-feature-display-section">
            <div className="mobile-feature-display-header">
              <img 
                src={node.logo} 
                alt={node.name} 
                className="mobile-feature-display-logo"
              />
              <span className="mobile-feature-display-name">{node.name}</span>
              <span className="mobile-feature-display-type">{t('columns.node')}</span>
            </div>
            <div className="mobile-feature-display-list">
              {node.features.map((feature, fIndex) => (
                <div key={fIndex} className="mobile-feature-display-item">
                  <span className="mobile-feature-display-icon">{getFeatureIcon(feature.type)}</span>
                  <span className="mobile-feature-display-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default MobileFeatureDisplay;
