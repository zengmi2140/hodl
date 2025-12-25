import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import MainLayoutDesktop from './MainLayoutDesktop';
import MainLayoutMobile from './MainLayoutMobile';
import SignatureModeSelector, { SignatureMode, ThresholdType } from './SignatureModeSelector';
import SignerColumn from './multisig/SignerColumn';
import WalletColumn from './multisig/WalletColumn';
import NodeColumn from './multisig/NodeColumn';
import TransferMethodDisplay from './multisig/TransferMethodDisplay';
import WalletNodeArrows from './multisig/WalletNodeArrows';
import { UserPreference, ComponentState, CustodyData } from '../types';
import './multisig/MultisigPage.css';

interface MainLayoutProps {
  userPreference: UserPreference | null;
  selectedSigners: string[];
  selectedWallet: string | null;
  selectedNode: string | null;
  getComponentState: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
  custodyData: CustodyData;
  onLayoutMeasured?: (bounds: { leftEdge: number; rightEdge: number }) => void;
  // 签名模式相关
  signatureMode: SignatureMode;
  threshold: ThresholdType;
  onModeChange: (mode: SignatureMode) => void;
  onThresholdChange: (threshold: ThresholdType) => void;
  // 多签模式相关
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

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const isMobile = useIsMobile(769);
  const {
    signatureMode,
    threshold,
    onModeChange,
    onThresholdChange,
    signerSlots,
    multisigWallet,
    multisigNode,
    onMultisigSignerSelect,
    onMultisigWalletSelect,
    onMultisigNodeSelect,
    getMultisigCompatibleSigners,
    getMultisigCompatibleWallets,
    getMultisigCompatibleNodes,
    custodyData,
    userPreference,
    ...singlesigProps
  } = props;

  // 渲染加载状态内容
  const renderLoadingContent = () => (
    <main className="main-layout loading">
      <div className="loading-message">正在加载...</div>
    </main>
  );

  // 渲染多签模式内容 - 移除多余的包装层，直接使用 multisig-columns
  const renderMultisigContent = () => (
    <div className="multisig-columns">
      <SignerColumn
        signerSlots={signerSlots}
        custodyData={custodyData}
        compatibleSigners={getMultisigCompatibleSigners()}
        onSignerSelect={onMultisigSignerSelect}
      />
      
      <TransferMethodDisplay
        signerSlots={signerSlots}
        selectedWallet={multisigWallet}
        custodyData={custodyData}
      />
      
      <WalletColumn
        selectedWallet={multisigWallet}
        custodyData={custodyData}
        compatibleWallets={getMultisigCompatibleWallets()}
        onWalletSelect={onMultisigWalletSelect}
        hasSelectedSigners={signerSlots.some(s => s !== null)}
      />
      
      <WalletNodeArrows
        hasWallet={multisigWallet !== null}
        hasNode={multisigNode !== null}
      />
      
      <NodeColumn
        selectedNode={multisigNode}
        custodyData={custodyData}
        compatibleNodes={getMultisigCompatibleNodes()}
        onNodeSelect={onMultisigNodeSelect}
        hasSelectedWallet={multisigWallet !== null}
      />
    </div>
  );

  // 渲染单签模式内容（仅列区域，不含外层 main）
  const renderSinglesigColumns = () => {
    if (!userPreference) {
      return <div className="loading-message">正在加载...</div>;
    }
    if (isMobile) {
      return (
        <MainLayoutMobile
          {...singlesigProps}
          userPreference={userPreference}
          custodyData={custodyData}
        />
      );
    }
    return (
      <MainLayoutDesktop
        {...singlesigProps}
        userPreference={userPreference}
        custodyData={custodyData}
      />
    );
  };

  return (
    <>
      {/* 签名模式选择器 */}
      <div className="signature-mode-container">
        <SignatureModeSelector
          mode={signatureMode}
          threshold={threshold}
          onModeChange={onModeChange}
          onThresholdChange={onThresholdChange}
        />
      </div>

      {/* 根据模式渲染不同内容 - 使用统一的 main 容器 */}
      <main className="main-layout">
        <div className="unified-columns-container">
          {signatureMode === 'multi' ? renderMultisigContent() : renderSinglesigColumns()}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
