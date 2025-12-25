import React from 'react';
import { UserPreference, ComponentState, CustodyData } from '../../types';
import { SignatureMode, ThresholdType } from '../SignatureModeSelector';
import SignatureModeSelector from '../SignatureModeSelector';
import MobileSignerCard from './MobileSignerCard';
import MobileMultisigSignerCard from './MobileMultisigSignerCard';
import MobileWalletCard from './MobileWalletCard';
import MobileNodeCard from './MobileNodeCard';
import MobileDataFlow from './MobileDataFlow';
import { SLOT_COLORS } from '../../App';
import './Mobile.css';

interface MobileMainLayoutProps {
  userPreference: UserPreference | null;
  custodyData: CustodyData;
  // Signature mode
  signatureMode: SignatureMode;
  threshold: ThresholdType;
  onModeChange: (mode: SignatureMode) => void;
  onThresholdChange: (threshold: ThresholdType) => void;
  // Single-sig mode
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  getComponentState: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  // Multi-sig mode
  signerSlots: (string | null)[];
  multisigWallet: string | null;
  multisigNode: string | null;
  onMultisigSignerSelect: (slotIndex: number, signerId: string | null) => void;
  onMultisigWalletSelect: (walletId: string | null) => void;
  onMultisigNodeSelect: (nodeId: string | null) => void;
  getMultisigCompatibleSigners: () => string[];
  getMultisigCompatibleWallets: () => string[];
  getMultisigCompatibleNodes: () => string[];
}

const MobileMainLayout: React.FC<MobileMainLayoutProps> = ({
  userPreference,
  custodyData,
  signatureMode,
  threshold,
  onModeChange,
  onThresholdChange,
  // Single-sig
  selectedSigners,
  selectedWallet,
  selectedNode,
  getComponentState,
  onComponentClick,
  // Multi-sig
  signerSlots,
  multisigWallet,
  multisigNode,
  onMultisigSignerSelect,
  onMultisigWalletSelect,
  onMultisigNodeSelect,
  getMultisigCompatibleSigners,
  getMultisigCompatibleWallets,
  getMultisigCompatibleNodes,
}) => {
  if (!userPreference) {
    return (
      <main className="mobile-main-layout">
        <SignatureModeSelector
          mode={signatureMode}
          threshold={threshold}
          onModeChange={onModeChange}
          onThresholdChange={onThresholdChange}
        />
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
          正在加载...
        </div>
      </main>
    );
  }

  // Get transfer method labels for data flow
  const getTransferMethodLabels = () => {
    if (signatureMode === 'single') {
      if (selectedSigners.length > 0 && selectedWallet) {
        const signerId = selectedSigners[0];
        if (signerId === 'none') return null;
        const methods = custodyData.transferMethods?.[signerId]?.[selectedWallet];
        if (methods && methods.length > 0) {
          return methods.join(' / ');
        }
      }
      return null;
    } else {
      // Multi-sig mode - get colored labels
      const coloredLabels: Array<{ color: string; label: string }> = [];
      signerSlots.forEach((signerId, index) => {
        if (signerId && multisigWallet) {
          const methods = custodyData.transferMethods?.[signerId]?.[multisigWallet];
          if (methods && methods.length > 0) {
            coloredLabels.push({
              color: SLOT_COLORS[index].border,
              label: methods[0],
            });
          }
        }
      });
      return coloredLabels.length > 0 ? coloredLabels : null;
    }
  };

  const hasSignerSelection = signatureMode === 'single'
    ? selectedSigners.length > 0 && !selectedSigners.includes('none')
    : signerSlots.some(s => s !== null);

  const currentWallet = signatureMode === 'single' ? selectedWallet : multisigWallet;
  const currentNode = signatureMode === 'single' ? selectedNode : multisigNode;

  const transferLabels = getTransferMethodLabels();

  return (
    <main className="mobile-main-layout">
      {/* Signature Mode Selector */}
      <SignatureModeSelector
        mode={signatureMode}
        threshold={threshold}
        onModeChange={onModeChange}
        onThresholdChange={onThresholdChange}
      />

      {/* Signer Card */}
      {signatureMode === 'single' ? (
        <MobileSignerCard
          selectedSigners={selectedSigners}
          custodyData={custodyData}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
      ) : (
        <MobileMultisigSignerCard
          signerSlots={signerSlots}
          custodyData={custodyData}
          compatibleSigners={getMultisigCompatibleSigners()}
          onSignerSelect={onMultisigSignerSelect}
        />
      )}

      {/* Data Flow: Signer -> Wallet */}
      <MobileDataFlow
        isActive={hasSignerSelection && currentWallet !== null}
        label={typeof transferLabels === 'string' ? transferLabels : undefined}
        coloredLabels={Array.isArray(transferLabels) ? transferLabels : undefined}
        flowType="signer-wallet"
      />

      {/* Wallet Card */}
      {signatureMode === 'single' ? (
        <MobileWalletCard
          selectedWallet={selectedWallet}
          custodyData={custodyData}
          compatibleWallets={custodyData.softwareWallets
            .filter(w => getComponentState(w.id, 'wallet') !== 'inactive')
            .map(w => w.id)}
          userPreference={userPreference}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
      ) : (
        <MobileWalletCard
          selectedWallet={multisigWallet}
          custodyData={custodyData}
          compatibleWallets={getMultisigCompatibleWallets()}
          userPreference={userPreference}
          onWalletSelect={onMultisigWalletSelect}
        />
      )}

      {/* Data Flow: Wallet -> Node */}
      <MobileDataFlow
        isActive={currentWallet !== null && currentNode !== null}
        flowType="wallet-node"
      />

      {/* Node Card */}
      {signatureMode === 'single' ? (
        <MobileNodeCard
          selectedNode={selectedNode}
          custodyData={custodyData}
          compatibleNodes={custodyData.nodes
            .filter(n => getComponentState(n.id, 'node') !== 'inactive')
            .map(n => n.id)}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
      ) : (
        <MobileNodeCard
          selectedNode={multisigNode}
          custodyData={custodyData}
          compatibleNodes={getMultisigCompatibleNodes()}
          onNodeSelect={onMultisigNodeSelect}
        />
      )}
    </main>
  );
};

export default MobileMainLayout;
