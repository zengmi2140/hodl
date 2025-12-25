import React from 'react';
import { CustodyData, ComponentState } from '../../types';
import OptimizedImage from './OptimizedImage';

interface NodeColumnProps {
  selectedNode: string | null;
  custodyData: CustodyData;
  compatibleNodes: string[];
  onNodeSelect: (nodeId: string | null) => void;
  hasSelectedWallet: boolean;
  // 单签模式使用
  getComponentState?: (componentId: string, type: 'signer' | 'wallet' | 'node') => ComponentState;
  onComponentClick?: (componentId: string, type: 'signer' | 'wallet' | 'node') => void;
}

const NodeColumn: React.FC<NodeColumnProps> = ({
  selectedNode,
  custodyData,
  compatibleNodes,
  onNodeSelect,
  hasSelectedWallet,
  getComponentState,
  onComponentClick,
}) => {
  const handleNodeClick = (nodeId: string) => {
    // 如果提供了单签模式的 onComponentClick，使用它
    if (onComponentClick) {
      onComponentClick(nodeId, 'node');
      return;
    }
    // 否则使用多签模式的逻辑
    if (selectedNode === nodeId) {
      onNodeSelect(null);
    } else if (compatibleNodes.includes(nodeId)) {
      onNodeSelect(nodeId);
    }
  };

  return (
    <div className="column">
      <div className="column-title">区块链节点</div>
      {custodyData.nodes.map(node => {
        // 如果提供了 getComponentState，使用单签模式的状态逻辑
        let isCompatible: boolean;
        let isBreathing: boolean;
        
        if (getComponentState) {
          const state = getComponentState(node.id, 'node');
          isCompatible = state !== 'inactive';
          isBreathing = state === 'breathing';
        } else {
          isCompatible = compatibleNodes.includes(node.id);
          isBreathing = hasSelectedWallet && isCompatible && selectedNode !== node.id;
        }
        
        const isSelected = selectedNode === node.id;
        
        return (
          <div
            key={node.id}
            className={`option-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''} ${isBreathing ? 'breathing' : ''}`}
            onClick={() => handleNodeClick(node.id)}
          >
            <OptimizedImage
              src={node.logo}
              alt={node.name}
              className="option-logo"
              loading="lazy"
            />
            <span className="option-name">{node.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default NodeColumn;