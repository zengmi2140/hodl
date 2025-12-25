import React from 'react';
import { createPortal } from 'react-dom';
import { CustodyData, Feature } from '../../types';

interface BottomFeatureDockProps {
  // 单签模式使用
  selectedSigners?: string[];
  // 共用
  selectedWallet: string | null;
  selectedNode: string | null;
  custodyData: CustodyData;
}

const renderFeatureItems = (features: Feature[]) => {
  return features.map((feature, index) => (
    <div key={index} className={`feature-item ${feature.type}`}>
      <span className="feature-icon">{feature.type === 'positive' ? '✅' : feature.type === 'negative' ? '❌' : '⚠️'}</span>
      <span className="feature-text">{feature.text}</span>
    </div>
  ));
};

const BottomFeatureDock: React.FC<BottomFeatureDockProps> = ({
  selectedSigners,
  selectedWallet,
  selectedNode,
  custodyData,
}) => {
  const hasAnySelection = (selectedSigners && selectedSigners.length > 0) || selectedWallet || selectedNode;

  if (!hasAnySelection) {
    return null;
  }

  const content = (
    <div className="bottom-feature-dock">
      {/* 单签模式下显示签名器特性 */}
      {selectedSigners && selectedSigners.length > 0 && (
        <div className="feature-box signer">
          <h4 className="feature-title">硬件签名器特性</h4>
          <div className="feature-list">
            {selectedSigners.flatMap(signerId => {
              const signer = custodyData.hardwareSigners.find(s => s.id === signerId);
              return signer ? renderFeatureItems(signer.features) : [];
            })}
          </div>
        </div>
      )}

      {selectedWallet && (
        <div className="feature-box wallet">
          <h4 className="feature-title">软件钱包特性</h4>
          <div className="feature-list">
            {(() => {
              const wallet = custodyData.softwareWallets.find(w => w.id === selectedWallet);
              return wallet ? renderFeatureItems(wallet.features) : null;
            })()}
          </div>
        </div>
      )}

      {selectedNode && (
        <div className="feature-box node">
          <h4 className="feature-title">区块链节点特性</h4>
          <div className="feature-list">
            {(() => {
              const node = custodyData.nodes.find(n => n.id === selectedNode);
              return node ? renderFeatureItems(node.features) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(content, document.body);
};

export default BottomFeatureDock;