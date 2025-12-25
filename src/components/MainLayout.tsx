import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import SignatureModeSelector, { SignatureMode, ThresholdType } from './SignatureModeSelector';
// 多签模式组件
import MultisigSignerColumn from './multisig/SignerColumn';
import MultisigTransferMethodDisplay from './multisig/TransferMethodDisplay';
import MultisigWalletNodeArrows from './multisig/WalletNodeArrows';
import MultisigBottomFeatureDock from './multisig/MultisigBottomFeatureDock';
// 单签模式组件
import SinglesigSignerColumn from './singlesig/SignerColumn';
// 共享组件
import WalletColumn from './shared/WalletColumn';
import NodeColumn from './shared/NodeColumn';
import TransferMethodDisplay from './shared/TransferMethodDisplay';
import WalletNodeArrows from './shared/WalletNodeArrows';
import BottomFeatureDock from './shared/BottomFeatureDock';
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
    // 单签模式 props
    selectedSigners,
    selectedWallet,
    selectedNode,
    getComponentState,
    onComponentClick,
  } = props;

  // 渲染加载状态内容
  if (!userPreference) {
    return (
      <main className="main-layout loading">
        <SignatureModeSelector
          mode={signatureMode}
          threshold={threshold}
          onModeChange={onModeChange}
          onThresholdChange={onThresholdChange}
        />
        <div className="loading-message">正在加载...</div>
      </main>
    );
  }

  // 获取单签模式的兼容钱包列表
  const getSinglesigCompatibleWallets = (): string[] => {
    return custodyData.softwareWallets
      .filter(wallet => getComponentState(wallet.id, 'wallet') !== 'inactive')
      .map(wallet => wallet.id);
  };

  // 获取单签模式的兼容节点列表
  const getSinglesigCompatibleNodes = (): string[] => {
    return custodyData.nodes
      .filter(node => getComponentState(node.id, 'node') !== 'inactive')
      .map(node => node.id);
  };

  // 渲染多签模式内容
  const renderMultisigContent = () => (
    <>
      <div className="columns-container">
        <MultisigSignerColumn
          signerSlots={signerSlots}
          custodyData={custodyData}
          compatibleSigners={getMultisigCompatibleSigners()}
          onSignerSelect={onMultisigSignerSelect}
        />
        
        <MultisigTransferMethodDisplay
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
          userPreference={userPreference}
        />
        
        <MultisigWalletNodeArrows
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
      
      <MultisigBottomFeatureDock
        selectedWallet={multisigWallet}
        selectedNode={multisigNode}
        custodyData={custodyData}
      />
    </>
  );

  // 渲染单签模式内容 - 使用与多签完全相同的架构
  const renderSinglesigContent = () => (
    <>
      <div className="columns-container">
        <SinglesigSignerColumn
          selectedSigners={selectedSigners}
          custodyData={custodyData}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
        
        <TransferMethodDisplay
          selectedSigners={selectedSigners}
          selectedWallet={selectedWallet}
          custodyData={custodyData}
        />
        
        <WalletColumn
          selectedWallet={selectedWallet}
          custodyData={custodyData}
          compatibleWallets={getSinglesigCompatibleWallets()}
          onWalletSelect={() => {}}
          hasSelectedSigners={selectedSigners.length > 0 && !selectedSigners.includes('none')}
          userPreference={userPreference}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
        
        <WalletNodeArrows
          hasWallet={selectedWallet !== null}
          hasNode={selectedNode !== null}
        />
        
        <NodeColumn
          selectedNode={selectedNode}
          custodyData={custodyData}
          compatibleNodes={getSinglesigCompatibleNodes()}
          onNodeSelect={() => {}}
          hasSelectedWallet={selectedWallet !== null}
          getComponentState={getComponentState}
          onComponentClick={onComponentClick}
        />
      </div>
      
      <BottomFeatureDock
        selectedSigners={selectedSigners}
        selectedWallet={selectedWallet}
        selectedNode={selectedNode}
        custodyData={custodyData}
      />
    </>
  );

  return (
    <main className="main-layout">
      {/* 签名模式选择器 - 直接放在 main-layout 内部 */}
      <SignatureModeSelector
        mode={signatureMode}
        threshold={threshold}
        onModeChange={onModeChange}
        onThresholdChange={onThresholdChange}
      />

      {/* 根据模式渲染不同内容 - 使用统一的容器 */}
      <div className="unified-columns-container">
        {signatureMode === 'multi' ? renderMultisigContent() : renderSinglesigContent()}
      </div>
    </main>
  );
};

export default MainLayout;
