import React from 'react';
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

  return (
    <div className="bottom-feature-dock-aligned">
      {/* 硬件签名器特性 - 与签名器列对齐 */}
      <div className="feature-box-column">
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
      </div>

      {/* 占位区域 - 对应数据流箭头区域 */}
      <div className="feature-box-spacer"></div>

      {/* 软件钱包特性 - 与钱包列对齐 */}
      <div className="feature-box-column">
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
      </div>

      {/* 占位区域 - 对应钱包-节点箭头区域 */}
      <div className="feature-box-spacer-small"></div>

      {/* 区块链节点特性 - 与节点列对齐 */}
      <div className="feature-box-column">
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
    </div>
  );
};

export default BottomFeatureDock;