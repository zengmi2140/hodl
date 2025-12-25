import React from 'react';
import { CustodyData } from '../../types';

interface NodeColumnProps {
  selectedNode: string | null;
  custodyData: CustodyData;
  compatibleNodes: string[];
  onNodeSelect: (nodeId: string | null) => void;
  hasSelectedWallet: boolean;
}

const NodeColumn: React.FC<NodeColumnProps> = ({
  selectedNode,
  custodyData,
  compatibleNodes,
  onNodeSelect,
  hasSelectedWallet,
}) => {
  const handleNodeClick = (nodeId: string) => {
    if (selectedNode === nodeId) {
      onNodeSelect(null);
    } else if (compatibleNodes.includes(nodeId)) {
      onNodeSelect(nodeId);
    }
  };

  return (
    <div className="multisig-column">
      <div className="multisig-column-title">区块链节点</div>
      {custodyData.nodes.map(node => {
        const isCompatible = compatibleNodes.includes(node.id);
        const isSelected = selectedNode === node.id;
        // 如果有选择钱包且节点兼容，显示呼吸动画
        const isBreathing = hasSelectedWallet && isCompatible && !isSelected;
        
        return (
          <div
            key={node.id}
            className={`multisig-item ${isCompatible ? 'compatible' : ''} ${isSelected ? 'selected' : ''} ${isBreathing ? 'breathing' : ''}`}
            onClick={() => handleNodeClick(node.id)}
          >
            <img
              src={node.logo}
              alt={node.name}
              className="multisig-item-logo"
            />
            <span className="multisig-item-name">{node.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default NodeColumn;
