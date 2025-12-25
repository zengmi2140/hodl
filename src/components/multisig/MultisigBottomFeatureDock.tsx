import React from 'react';
import { createPortal } from 'react-dom';
import { CustodyData, Feature } from '../../types';

interface MultisigBottomFeatureDockProps {
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

const MultisigBottomFeatureDock: React.FC<MultisigBottomFeatureDockProps> = ({
  selectedWallet,
  selectedNode,
  custodyData,
}) => {
  const hasAnySelection = selectedWallet || selectedNode;

  if (!hasAnySelection) {
    return null;
  }

  const content = (
    <div className="bottom-feature-dock-aligned">
      <div className="feature-dock-inner">
        {/* 签名器列占位 - 多签模式下签名器特性通过 tooltip 显示 */}
        <div className="feature-box-column">
          <div className="feature-box-placeholder"></div>
        </div>

        {/* 占位区域 - 对应数据流箭头区域 */}
        <div className="feature-box-spacer"></div>

        {/* 软件钱包特性 - 与钱包列对齐 */}
        <div className="feature-box-column">
          {selectedWallet ? (
            <div className="feature-box wallet">
              <h4 className="feature-title">软件钱包特性</h4>
              <div className="feature-list">
                {(() => {
                  const wallet = custodyData.softwareWallets.find(w => w.id === selectedWallet);
                  return wallet ? renderFeatureItems(wallet.features) : null;
                })()}
              </div>
            </div>
          ) : (
            <div className="feature-box-placeholder"></div>
          )}
        </div>

        {/* 占位区域 - 对应钱包-节点箭头区域 */}
        <div className="feature-box-spacer"></div>

        {/* 区块链节点特性 - 与节点列对齐 */}
        <div className="feature-box-column">
          {selectedNode ? (
            <div className="feature-box node">
              <h4 className="feature-title">区块链节点特性</h4>
              <div className="feature-list">
                {(() => {
                  const node = custodyData.nodes.find(n => n.id === selectedNode);
                  return node ? renderFeatureItems(node.features) : null;
                })()}
              </div>
            </div>
          ) : (
            <div className="feature-box-placeholder"></div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(content, document.body);
};

export default MultisigBottomFeatureDock;